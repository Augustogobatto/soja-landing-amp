export default async (request, context) => {
  // Só processa o index.html
  if (!request.url.includes('.html') && !request.url.endsWith('/')) {
    return context.next();
  }

  // Pega a resposta original
  const response = await context.next();
  
  // Só modifica HTML
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    return response;
  }

  // Lê o HTML
  const html = await response.text();
  
  // Pega a URL completa com UTMs
  const fullUrl = request.url;
  
  // Substitui o placeholder pela URL real
  const modifiedHtml = html.replace('PLACEHOLDER_URL', fullUrl);
  
  // Retorna o HTML modificado
  return new Response(modifiedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
};

// Configura para rodar em todas as páginas
export const config = { 
  path: "/*" 
};