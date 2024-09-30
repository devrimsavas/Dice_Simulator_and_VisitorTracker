$(document).ready(() => {
  // Function to collect user information
  function collectUserInfo() {
    const userInfo = {
      platform: window.navigator.platform, // OS information
      userAgent: window.navigator.userAgent, // Browser and OS details
      screenWidth: window.screen.width, // Screen width
      screenHeight: window.screen.height, // Screen height
      language: window.navigator.language, // Browser language
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Timezone
    };

    // Send the collected information to the backend
    $.ajax({
      url: "/user-info", // Backend route to handle user data
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(userInfo),
      success: (response) => {
        console.log("User info sent to the backend:", response);
      },
      error: (error) => {
        console.error("Error sending user info:", error);
      },
    });
  }

  // Call the function to collect and send user info when the page loads
  collectUserInfo();

  // Rest of your existing chart code here...
});
