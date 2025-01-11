document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('g').forEach((group) => {
      group.addEventListener('click', () => {
          const target = group.getAttribute('data-value'); // Retrieve the target value
          window.location.href = `/?target=${target}`; // Redirect to the server with the target query
      });
  });
});
