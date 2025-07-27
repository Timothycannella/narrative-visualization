const margin = { top: 50, right: 20, bottom: 50, left: 60 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const tooltip = d3.select(".tooltip");

const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

const xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));
const yAxis = d3.axisLeft(y);

const colorMap = {
    win: { label: "Win %", color: "steelblue" },
    cover: { label: "Cover %", color: "darkred" },
    push: { label: "Push %", color: "seagreen" }
};

const line = metric => d3.line()
    .x(d => x(d.season))
    .y(d => y(d[metric]));

d3.csv("data/team_season_summary.csv").then(data => {
    data.forEach(d => {
        d.season = +d.season;
        d.win_pct = +d.win_pct;
        d.cover_pct = +d.cover_pct;
        d.push_pct = +d.push_pct;
    });

    console.log("Loaded data:", data);

    const teams = [...new Set(data.map(d => d.team))].sort();
    const dropdown = d3.select("#teamSelect");
    teams.forEach(team => dropdown.append("option").text(team));

    dropdown.on("change", () => updateChart(dropdown.property("value")));
    d3.selectAll(".toggle").on("change", () => updateChart(dropdown.property("value")));

    x.domain(d3.extent(data, d => d.season));
    y.domain([0, 100]);

    svg.append("g").attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .text("Season");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .text("Percentage");

    const lines = svg.append("g").attr("class", "lines");
    const points = svg.append("g").attr("class", "points");

    function updateChart(selectedTeam) {
        const teamData = data.filter(d => d.team === selectedTeam);

        lines.selectAll("path").remove();
        points.selectAll("circle").remove();

        const toggles = Array.from(document.querySelectorAll(".toggle:checked")).map(d => d.value);

        toggles.forEach(metric => {
            lines.append("path")
                .datum(teamData)
                .attr("class", `line ${metric}`)
                .attr("stroke", colorMap[metric].color)
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("d", line(`${metric}_pct`));

            points.selectAll(`.point-${metric}`)
                .data(teamData)
                .enter()
                .append("circle")
                .attr("class", `point-${metric}`)
                .attr("r", 4)
                .attr("fill", colorMap[metric].color)
                .attr("cx", d => x(d.season))
                .attr("cy", d => y(d[`${metric}_pct`]))
                .on("mouseover", (event, d) => {
                    tooltip.style("display", "block")
                        .html(`<strong>${colorMap[metric].label}</strong><br>Season: ${d.season}<br>Value: ${d[`${metric}_pct`]}%`)
                        .style("left", `${event.pageX + 10}px`)
                        .style("top", `${event.pageY - 28}px`);
                })
                .on("mouseout", () => tooltip.style("display", "none"));
        });
    }

    updateChart(teams[0]);
});
