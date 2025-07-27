# Covering the Spread: A Narrative Visualization of NFL Betting Trends

This project is an interactive narrative visualization that explains and explores NFL betting trends — specifically, what it means to *cover the spread* 
and how teams have performed against it over time. It uses the **martini glass structure**, progressing from a guided narrative into interactive exploration.


## Project Goal

The visualization aims to:
- Explain the concept of "covering the spread" in NFL betting.
- Show how betting outcomes (wins, covers, pushes) have changed from 2010–2024.
- Let users explore trends by team using an interactive chart.

---

## Narrative Structure

This visualization follows the **Martini Glass** model:
1. **Introductory Scenes** (Scenes 1–2): Present a focused narrative with annotated visual explanations.
2. **Interactive Scene** (Scene 3): Allows user exploration of betting trends by team and season.

---

## Scenes

### Scene 1: What Does It Mean to Cover the Spread?
- A visual explanation using a New England Patriots example.
- Introduces the key concept for beginners.

### Scene 2: Trends Over Time
- A historical chart showing win %, cover %, and push % for favorites and underdogs from 2010–2024.

### Scene 3: Team Trends Over Time
- A D3-powered interactive line chart.
- Select any NFL team and explore win, cover, and push percentages by season.
- Includes toggles for each metric.

---

## Tools & Technologies

- [D3.js v7](https://d3js.org/)
- HTML, CSS, and JavaScript
- GitHub Pages for hosting

---

## File Structure
```
narrative-visualization/
├── index.html              # Main visualization page
├── style.css               # Styling for layout and typography
├── js/
│   └── scene3.js           # Interactive D3 chart logic
├── data/
│   └── team_season_summary.csv  # Team season data (2010–2024)
├── images/
│   ├── scene1.png          # Static bar chart for Scene 1
│   └── scene2.png          # Static line chart for Scene 2
└── README.md               # Project overview and setup instructions
```


## How to Run Locally

1. Clone the repository:
  ```
   git clone https://github.com/Timothycannella/narrative-visualization.git
   cd narrative-visualization
```
3. Serve with a local server (e.g. Python or VS Code Live Server):
   ```
   python -m http.server

5. Visit:
     ```
     http://localhost:8000/

