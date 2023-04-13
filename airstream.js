    // ------------
    // airstream.js
    // ------------
    // A javascript library for building ChatGPT-like messaging interfaces, in just one line of code.

    // Get the parent element by its ID
    const messages = document.getElementById("messages");
    const sendButton = document.getElementById("send");
    const messageInterval = 2000;

    // dynamic vars
    let intervalId = null;
    let isRunning = false;
    let stopInterval;
    let shouldAutoScroll = true;
    let randomIndex = null;

    function getRandomMessage() {
      const addOnQuestion = " What would you like to do next?";
      const messageOptions = [
      "You're standing on the edge of a cliff, overlooking a vast ocean that stretches out before you. The sun is setting in a fiery blaze of orange and red, casting a warm glow over everything around you. As you take in the beauty of the scene, a nagging feeling creeps into the back of your mind. Night is settling in.",
      "Suddenly, a bright light envelops you and you find yourself on the back of a majestic flying unicorn, soaring high up among the stars. As you fly around admiring the different planets and galaxies, you spot a colorful character dancing on a nearby planet.",
      "The girl with bright blue hair and a matching tail, introduces herself as Oceana, the keeper of the Bubble Planet. You join in her bubble fun and as you spend time with Oceana, you realize that she's exactly the friend you were looking for, with a contagious energy that makes you forget all your worries.",
      "Sorry, I don't have a prompt for that scene.",
      ];
      randomIndex = (randomIndex === null) ? randomIndex = Math.floor(Math.random() * messageOptions.length) : randomIndex = (randomIndex + 1) % messageOptions.length;
      return messageOptions[randomIndex] + addOnQuestion;
    }

    function clearInstructions(){
      const instructionsDiv = document.getElementById("instructions");
      if (instructionsDiv) {
        instructionsDiv.remove();
      }
    }

    // handleUserScroll
    // Handles the user's manual 'scroll' event on the chat element.
    // Updates the 'shouldAutoScroll' flag based on whether the user has scrolled to the bottom of the chat or not.
    // This flag is used to prevent auto scrolling while the user is reading earlier chat content.
    function handleUserScroll() {
      const scrollDifference = messages.scrollHeight - messages.clientHeight;
      if (messages.scrollTop !== scrollDifference) {
        shouldAutoScroll = false;
      } else {
        shouldAutoScroll = true;
      }
    }

    // scrollToBottom
    function scrollToBottom(element) {
      const scrollDifference = element.scrollHeight - element.clientHeight;
      if (element.scrollTop !== scrollDifference) {
        // are we not already at the bottom?
        element.scrollTop = element.scrollHeight;
        console.log('scrolled');
      }
    }

    // typeWriter
    function typeWriter(element, words, index) {
      if (index < words.length) {
        element.textContent += words[index] + " ";
        // debugLog('words[' + index + ']: ', words[index]);
        if (shouldAutoScroll) scrollToBottom(messages);
        setTimeout(function() { typeWriter(element, words, ++index); }, 100);
      } else {
        sendButton.disabled = false;
        // debugLog('<Send button enabled>');
      }
    }

    // writeMessage
    function writeMessage() {
      clearInstructions();
      // disable button while we are typing
      sendButton.disabled = true;
      // Create the new div element
      const newMessage = document.createElement("div");
      messages.appendChild(newMessage);
      // Add the "message" class to the div
      newMessage.classList.add("message");
      let message = getRandomMessage();
      let words = message.split(" ");
      let index = 0;
      typeWriter(newMessage, words, index);
    }

    // Event listeners
    sendButton.addEventListener("click", writeMessage);
    messages.addEventListener("scroll", handleUserScroll);