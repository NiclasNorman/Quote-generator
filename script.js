document.addEventListener('DOMContentLoaded', () => {
  const adviceContainer = document.querySelector('.main p');
  const circle = document.getElementById('circle'); // Cirkel-elementet
  const adviceHeader = document.querySelector('h3'); // H3-elementet för rådgivning
  let adviceCount = 0; // Variabel för att hålla reda på antalet citat

  async function fetchAdvice() {
    try {
      // Lägg till ett slumpmässigt query-param för att ignorera cachade svar
      const randomQuery = Math.random().toString(36).substring(7);
      const response = await fetch(`https://api.adviceslip.com/advice?${randomQuery}`);
      const data = await response.json();
      return data.slip.advice;
    } catch (error) {
      console.error('Error fetching advice:', error);
      return 'Unable to fetch advice at the moment';
    }
  }

  async function fetchAndDisplayAdvice() {
    const advice = await fetchAdvice();
    updateHTML(advice);
    updateAdviceCounter(); // Uppdatera citaträknaren vid varje nytt citat
  }

  function updateHTML(adviceText) {
    // Lägg till citattecken runt citatet
    adviceContainer.textContent = `"${adviceText}"`;
  }

  function updateAdviceCounter() {
    adviceCount++; // Öka räknaren med 1
    adviceHeader.textContent = `Advice #${adviceCount}`;
    adviceHeader.style.fontSize = '10px';
    adviceHeader.style.fontWeight = ' arial'; // Uppdatera texten för citaträknaren
    adviceHeader.style.wordSpacing =' 1px';
  }

  // Lägg till en eventlyssnare på cirkeln för att hämta och visa ett nytt citat
  circle.addEventListener('click', fetchAndDisplayAdvice);

  // Initial fetch och display av citat
  fetchAndDisplayAdvice();
});
