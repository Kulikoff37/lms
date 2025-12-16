const qblocks = document.querySelectorAll('.qblock');

const result = Array.from(qblocks).map((qblock) => {
  // Find the main question text in the first table row
  const questionCell = qblock.querySelector('.cell_0, td[valign="top"]');
  let questionText = '';

  if (questionCell) {
    // Get all text content, including from nested elements
    const textNodes = [];
    const walker = document.createTreeWalker(
      questionCell,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (text) {
        textNodes.push(text);
      }
    }

    // Join the text nodes to get the complete question
    questionText = textNodes.join(' ').trim();
  }

  // Find all options in the distractors table
  const distractorsTable = qblock.querySelector('.distractors-table');
  let options = [];

  if (distractorsTable) {
    const optionRows = distractorsTable.querySelectorAll('tr');
    optionRows.forEach(row => {
      // Look for cells with options (usually contains checkbox and p.Distractor or p.MsoNormal)
      const optionCell = row.querySelector('td[width="100%"]');
      if (optionCell) {
        // Get the text content of the option, handling nested spans
        const textNodes = [];
        const walker = document.createTreeWalker(
          optionCell,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );

        let node;
        while (node = walker.nextNode()) {
          const text = node.textContent.trim();
          if (text) {
            textNodes.push(text);
          }
        }

        // Join the text nodes to get the complete option
        const optionText = textNodes.join(' ').trim();

        if (optionText) {
          options.push({
            text: optionText
          });
        }
      }
    });
  }

  return {
    text: questionText,
    options,
    // For multiple choice questions, correctAnswer would be an array of indices
    // This can't be determined from the HTML alone, so it will need manual input
    correctAnswer: [] // array of correct option indices
  };
});

console.log(JSON.stringify(result, null, 2));