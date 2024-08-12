const handleTextareaChange = (e) => {
  e.currentTarget.style.height = 'auto';
  e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
}

export { handleTextareaChange }