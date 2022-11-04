import Cookies from 'js-cookie';

const TokenKey = 'auth-token';
const expires = new Date(new Date().getTime() + 28800000); //8h

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

function onSignIn(response) {
  $('input, .btn').prop('disabled', true);
  loading.value = true;
  if (response.credential) {
    userStore.googleAuth(response.credential)
    .then(() => {
      router.push(route.query.redirect || '/' );
    })
    .finally(() => {
      $('input, .btn').prop('disabled', false);
      loading.value = false;
    });
  }
}

export function mountGoogleButton() {
  google.accounts.id.initialize({
    client_id:
      '191398710109-rp9vj85bpvp661vndon6j9d5qh3bcaj4.apps.googleusercontent.com',
    callback: onSignIn,
  });
  google.accounts.id.renderButton(document.getElementById('googleButton'), {
    theme: 'outline',
    size: 'large',
    with: 400,
  });
}