let count = 0;
let result = '';

function clickMe () {
  const container = document.getElementById('clickFeedback');
  count++;
  result += `<p>button clicked ${count} times</p>`;
  container.innerHTML = result;
}