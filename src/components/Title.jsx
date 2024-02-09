// Title.jsx

// This function is to update the "Page Title"  
export function changePageTitle(newTitle) {
    // Calling the page title title by ID 
    const titleElement = document.getElementById('pageTitle');
    // Check titleElement isn't empty 
    if (titleElement) {
      // Update the page title
      titleElement.textContent = newTitle;
    }
  }