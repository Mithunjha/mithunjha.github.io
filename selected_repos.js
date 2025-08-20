// === CONFIG ===
const GH_USERNAME = "Mithunjha";
// List exactly the repos you want to show (names only)
const PICKED_REPOS = [
  "EarEEG_KnowledgeDistillation",
  "DEEP-squared",
  "Cross-Modal-Transformer"   // change to your actual repo names
];

async function fetchRepo(user, repo) {
  const res = await fetch(`https://api.github.com/repos/${user}/${repo}`);
  if (!res.ok) return null;
  return res.json();
}

function langDot(color) {
  return `<span class="lang-dot" style="background:${color}"></span>`;
}

// Minimal language color map (add more if you like)
const LANG_COLORS = {
  "Python": "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  "JavaScript": "#f1e05a",
  "TypeScript": "#3178c6",
  "C++": "#f34b7d",
  "C": "#555555",
  "HTML": "#e34c26",
  "CSS": "#563d7c"
};

function fmtDate(iso) {
  try { return new Date(iso).toLocaleDateString(); } catch { return iso; }
}

function repoCard(repo) {
  const lang = repo.language || "N/A";
  const color = LANG_COLORS[lang] || "#8aa0b4";
  const desc = repo.description ? repo.description : "No description provided.";
  return `
    <article class="repo-card">
      <h3 class="repo-title">
        <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
      </h3>
      <p class="repo-desc">${desc}</p>
      <div class="repo-meta">
        <span title="Stars">⭐ ${repo.stargazers_count}</span>
        <span title="Forks">🍴 ${repo.forks_count}</span>
        <span title="Language">${langDot(color)} ${lang}</span>
        <span title="Last updated">🕒 ${fmtDate(repo.updated_at)}</span>
      </div>
    </article>
  `;
}

async function renderPickedRepos() {
  const grid = document.getElementById("selected-repos");
  if (!grid) return;

  const data = await Promise.all(PICKED_REPOS.map(r => fetchRepo(GH_USERNAME, r)));
  data.filter(Boolean).forEach(repo => {
    grid.insertAdjacentHTML("beforeend", repoCard(repo));
  });

  // Fallback if none loaded
  if (!grid.children.length) {
    grid.innerHTML = `<div class="repo-empty">No repositories found. Check names in PICKED_REPOS.</div>`;
  }
}

renderPickedRepos();