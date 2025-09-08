exports.handler = async (event, context) => {
  // Pega a URL de onde veio o formulário (com UTMs)
  const pageUrl = event.headers.referer || 'https://manejocampeao.netlify.app/';
  
  // Parse do formulário AMP
  const formData = JSON.parse(event.body);
  
  // Adiciona a URL completa aos dados
  formData['fields[full_url][value]'] = pageUrl;
  
  // Envia para seu webhook N8N
  const response = await fetch('https://primary-production-bf2d.up.railway.app/webhook/cb3b0556-230d-46a7-a941-4c902d29da55', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  
  // Retorna sucesso para o AMP
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify({ 
      success: true,
      message: 'Formulário enviado com sucesso!'
    })
  };
};