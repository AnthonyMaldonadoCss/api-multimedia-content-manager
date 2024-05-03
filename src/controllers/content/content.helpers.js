const validContent = (content, topicRules) => {
  const isValid = topicRules.some((rule) => {
    if ( rule.texto ) {
      return typeof content === 'string'
    }
    if ( rule.videos ) {
      const regexUrlYoutube = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
      return regexUrlYoutube.test(content);
    }
    if ( rule.imagenes ) {
      const regexB64 = /^[a-zA-Z0-9+/]*={0,2}$/;
      return regexB64.test(content);
    }
  })
  return isValid
}

module.exports = {
  validContent
}