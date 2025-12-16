const qblocks = document.querySelectorAll('.qblock');

const result = Array.from(qblocks).map((qblock) => {
  // Find the main question text in the first table row
  const basisElement = qblock.querySelector('table tbody > tr');
  const basisText = basisElement ? basisElement.textContent.trim() : '';

  // Find all options in the submit-outblock section
  const distractorsTable = qblock.querySelector('.submit-outblock');
  let options = [];

  if (distractorsTable) {
    // Get all option rows
    const optionRows = distractorsTable.querySelectorAll('tr');
    optionRows.forEach(row => {
      // Check if this row contains an option
      const pElement = row.querySelector('td p.MsoNormal');
      if (pElement) {
        const optionText = pElement.textContent.trim();
        if (optionText) {
          options.push({
            text: optionText
          });
        }
      }
    });
  }

  return {
    text: basisText,
    options,
    // correctAnswer will need to be manually filled in as we can't determine from HTML alone
    correctAnswer: null
  };
});

console.log(JSON.stringify(result, null, 2));