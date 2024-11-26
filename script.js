// Reihenfolge der Buchstaben
const sequence = [
    'a', 'n', 't', 'o', 'n', 'i', 'a', 's', 'a', 'd', 'v', 'e', 'n', 't', 's', 'k', 'a', 'l', 'e', 'n', 'd', 'e', 'r'
  ];
  
  const colors = [
      'black', 'rgb(0, 0, 255)', 'rgb(50, 220, 0)', 'rgb(230, 70, 220)',
      'rgb(255, 115, 70)', 'rgb(0, 100, 0)', 'rgb(255, 87, 34)',
      'rgb(128, 0, 128)', 'rgb(255, 20, 147)', 'rgb(100, 149, 237)',
      'rgb(255, 69, 0)', 'rgb(50, 205, 50)', 'rgb(255, 105, 180)'
  ];
  const fonts = ['sans-serif', 'serif', 'helvetica', 'inter'];

  let currentLetterIndex = 0;
  let letters = [];
  let allLettersAppeared = false;
  
  function getRandomPosition(variation = 50) {
      const x = window.innerWidth / 2 + Math.random() * variation - variation / 2;
      const y = window.innerHeight / 2 + Math.random() * variation - variation / 2;
      return [x, y];
  }
  
  function getRandomProperties() {
      return {
          color: colors[Math.floor(Math.random() * colors.length)],
          fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
          fontWeight: Math.random() > 0.5 ? 'bold' : 'normal'
      };
  }
  
  function createLetter(char) {
      const letter = document.createElement('span');
      letter.classList.add('letter');
      letter.textContent = char;
      
      // Setze zufällige Position für jeden neuen Buchstaben
     const left = Math.random() * window.innerWidth;
     const top = Math.random() * window.innerHeight;
     letter.style.left = `${left}px`;
     letter.style.top = `${top}px`;

     // Setze zufällige Geschwindigkeit für Bewegung
    letter.dataset.speedX = (Math.random() * 2 - 1) * 1; // Geschwindigkeit zwischen -3 und 3
    letter.dataset.speedY = (Math.random() * 2 - 1) * 1;

  
      // Initiale zufällige Stile
      const { color, fontFamily, fontWeight } = getRandomProperties();
      letter.style.color = color;
      letter.style.fontFamily = fontFamily;
      letter.style.fontWeight = fontWeight;
  
      // Klick-Event für das Wechseln der Eigenschaften und das Anzeigen des nächsten Buchstabens
      letter.addEventListener('click', () => {
          // Ändern der Eigenschaften
          const newProperties = getRandomProperties();
          letter.style.color = newProperties.color;
          letter.style.fontFamily = newProperties.fontFamily;
          letter.style.fontWeight = newProperties.fontWeight;
  
          // Nächsten Buchstaben anzeigen
          if (currentLetterIndex < sequence.length - 1) {
              currentLetterIndex++;
              createLetter(sequence[currentLetterIndex]);
          } else {
              // Endformation nach 3 Sekunden
              setTimeout(arrangeLetters, 3000);
          }
      });
  
      document.body.appendChild(letter);
      letters.push(letter); // Hinzufügen zum globalen Buchstaben-Array
  }
  
  // Ordnet die Buchstaben zur Endformation an
  function arrangeLetters() {
    const line1 = "Antonias";
    const line2 = "Adventskalender";

    const centerX = window.innerWidth / 2; // Horizontale Mitte des Bildschirms
    const centerY = window.innerHeight / 2; // Vertikale Mitte des Bildschirms

    const spacing = 7; // Vergrößerter Abstand zwischen den Buchstaben in vw (5vw entspricht 5% der Breite)
    const lineSpacing = 8; // Zeilenabstand in vw (8vw für mehr Abstand zwischen Zeilen)

    const line1StartX = centerX - ((line1.length * spacing) / 2) * window.innerWidth / 100;
    const line2StartX = centerX - ((line2.length * spacing) / 2) * window.innerWidth / 100;

    letters.forEach((letter, index) => {
        letter.style.position = 'absolute';
        
        if (index < line1.length) {
            // Erste Zeile: "Antonias"
            letter.style.left = `${line1StartX + index * spacing * window.innerWidth / 100}px`;
            letter.style.top = `${centerY - lineSpacing * window.innerWidth / 100}px`;
        } else {
            // Zweite Zeile: "Adventskalender"
            letter.style.left = `${line2StartX + (index - line1.length) * spacing * window.innerWidth / 100}px`;
            letter.style.top = `${centerY + lineSpacing * window.innerWidth / 100}px`;
        }

        // Entferne Bewegung und Rotation
        letter.style.animation = 'none';
        letter.style.transition = 'none';
    });

    // Beende das Animations-Loop, damit die Buchstaben stillstehen
    allLettersAppeared = true;
}


  // Funktion zur kontinuierlichen Bewegung der Buchstaben
function animateLetters() {
    if (allLettersAppeared) return; // Stoppt die Animation, wenn alle Buchstaben in Endposition sind
    letters.forEach(letter => {
        let speedX = parseFloat(letter.dataset.speedX);
        let speedY = parseFloat(letter.dataset.speedY);
        let left = parseFloat(letter.style.left);
        let top = parseFloat(letter.style.top);

        // Position aktualisieren
        left += speedX;
        top += speedY;

        // Begrenzungen setzen, damit die Buchstaben bei den Rändern abprallen
        if (left <= 0 || left + letter.offsetWidth >= window.innerWidth) {
            speedX = -speedX;
            letter.dataset.speedX = speedX;
        }
        if (top <= 0 || top + letter.offsetHeight >= window.innerHeight) {
            speedY = -speedY;
            letter.dataset.speedY = speedY;
        }

        // Anwenden der neuen Positionen
        letter.style.left = `${left}px`;
        letter.style.top = `${top}px`;
    });
    requestAnimationFrame(animateLetters);
}

// Starte die Animation
animateLetters();

  // Starte mit dem ersten Buchstaben
  createLetter(sequence[currentLetterIndex]);
  
