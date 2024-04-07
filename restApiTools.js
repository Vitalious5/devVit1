
function updateLink() {
  const environment = document.getElementById('environment').value;
  const responseType = document.getElementById('response_type').value;
  const state = document.getElementById('state').value;
  const codeChallenge = document.getElementById('code_challenge').value;
  const codeChallengeMethod = document.getElementById('code_challenge_method').value;
  const clientId = document.getElementById('client_id').value;
  const scope = document.getElementById('scope').value;
  const redirectUri = document.getElementById('redirect_uri').value;

  const resultLink = `${environment}?response_type=${encodeURIComponent(responseType)}&state=${encodeURIComponent(state)}&code_challenge=${encodeURIComponent(codeChallenge)}&code_challenge_method=${encodeURIComponent(codeChallengeMethod)}&client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  document.getElementById('resultLink').href = resultLink;
  document.getElementById('resultLink').textContent = resultLink;
}
