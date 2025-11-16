process.on('warning', (warning) => {
  console.warn('Process Warning:');
  console.warn('Name:', warning.name);
  console.warn('Message:', warning.message);
  console.warn('Stack:', warning.stack);
});

// Emit a custom warning
process.emitWarning('This is a custom warning', {
  code: 'CUSTOM_WARNING',
  detail: 'Additional details here'
});
