$(document).ready(() => {
  let diceChart;
  let base_url = window.location;

  $("#simulateButton").on("click", () => {
    const diceFaces = parseInt($("#diceFaces").val()) || 6;
    const rollTimes = parseInt($("#rollTimes").val()) || 1000;

    // AJAX request to send the data to the backend
    $.ajax({
      url: base_url.origin + "/", // Backend URL
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ diceFaces, rollTimes }),
      success: (response) => {
        console.log("Response from server:", response);

        // Clear the results table before populating
        const resultsTable = $("#resultsTable");
        resultsTable.empty();

        let labels = [];
        let frequencies = [];

        // Populate the table with the result from the server
        for (const [key, value] of Object.entries(response)) {
          labels.push(key);
          frequencies.push(value);

          const row = $("<tr></tr>");
          const faceCell = $("<td></td>").text(key);
          const frequencyCell = $("<td></td>").text(value);
          row.append(faceCell, frequencyCell);
          resultsTable.append(row);
        }

        // Update the chart
        updateChart(labels, frequencies);
      },
      error: (error) => {
        console.error("Error:", error);
      },
    });
  });

  // Function to create or update the chart
  function updateChart(labels, frequencies) {
    const ctx = document.getElementById("diceChart").getContext("2d");

    if (diceChart) {
      diceChart.destroy(); // Destroy the old chart if it exists
    }

    // Generate random colors for each bar
    const backgroundColors = labels.map(
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.2)`
    );
    const borderColors = labels.map(
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 1)`
    );

    diceChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Frequency of Dice Rolls",
            data: frequencies,
            backgroundColor: backgroundColors, // Array of colors
            borderColor: borderColors, // Array of border colors
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  //add wheels
});
