const qblocks = document.querySelectorAll('.qblock');

const result = Array.from(qblocks).map((qblock) => {
  const basisElement = qblock.querySelector('table tbody > tr');
  const basisText = basisElement ? basisElement.textContent.trim() : '';

  const distractorsTable = qblock.querySelector('.submit-outblock');
  let options = [];

  if (distractorsTable) {
    const msoElements = distractorsTable.querySelectorAll('.submit-outblock p');
    options = Array.from(msoElements).map((el) => ({
      text: el.textContent.trim()
    }));
  }

  return {
    text: basisText,
    options
  };
});

console.log(result)
