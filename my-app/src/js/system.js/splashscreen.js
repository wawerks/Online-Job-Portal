    // Simulate loading time with setTimeout
    window.addEventListener('load', function() {
      setTimeout(function() {
        // Hide the splash screen after some time (e.g., 3 seconds)
        document.getElementById('splash-screen').style.display = 'none';
        // Show the main app content
        // document.getElementById('app').style.display = 'block';
      }, 3000); // Adjust the timeout value as needed

      // Animate the loading bar to fill up
      var loadingBar = document.querySelector('.fill');
      loadingBar.style.width = '100%';
    });

