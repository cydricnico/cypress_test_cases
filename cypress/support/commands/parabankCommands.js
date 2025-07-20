

//Screenshot
Cypress.Commands.add("getScreenshotWithDate", (baseName = 'screenshot', options = {}) => {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-');
  const fullName = `${baseName}-${timestamp}`;
  return cy.screenshot(fullName, options);
});