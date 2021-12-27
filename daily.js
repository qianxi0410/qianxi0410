const fs = require('fs');
const { default: axios } = require('axios');

async function run() {
  try {
    const readme = fs.readFileSync('./README.md', 'utf-8');
    const Point = '</h3>';
    const index = readme.indexOf(Point);
    const before = readme.substring(0, index + 5);

    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = now.getDate();
    day = day < 10 ? `0${day}` : day;
    const date = `${year}-${month}-${day}`;
    const { data: res } = await axios.get('https://api.quotable.io/random?maxLength=60');
    console.log(`quotations: ${res.content}`);
    const dayily = `${res.content}   - ${res.author}`;

    const newReadme = `${before}

<kbd>${date}</kbd>

${dayily}

<!-- Randomly taken from quotations.md -->

<p align="right">
<img src="https://visitor-badge.glitch.me/badge?page_id=qianxi0410.qianxi0410" />
</p>

![snake gif](https://github.com/qianxi0410/qianxi0410/blob/output/github-contribution-grid-snake.svg)
`;

    fs.writeFileSync('./README.md', newReadme);
    console.log('Update Success!');
  } catch (error) {
    console.log(error.message);
  }
}

run();
