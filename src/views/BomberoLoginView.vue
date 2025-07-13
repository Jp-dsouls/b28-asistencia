<template>
  <div class="center-screen">
    <div class="login-container-2col">
      <div class="login-left">
        <form @submit.prevent="onLogin">
          <h1>Iniciar sesión</h1>
          <input type="text" placeholder="Usuario" v-model="loginForm.username" />
          <input type="password" placeholder="Contraseña" v-model="loginForm.password" />
          <a href="#">¿Olvidaste tu contraseña?</a>
          <button type="submit">Entrar</button>
        </form>
      </div>
      <div class="login-right">
        <h1>¡Hola, amigo!</h1>
        <p>Ingresa tus datos personales y comienza tu viaje con nosotros</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginForm = ref({
  username: '',
  password: ''
})

const users = [
  { username: 'admin', password: 'admin', role: 'admin' },
  { username: 'user', password: 'user', role: 'bombero' }
]

function onLogin() {
  const found = users.find(u => u.username === loginForm.value.username && u.password === loginForm.value.password)
  if (found) {
    localStorage.setItem('user', JSON.stringify({ username: found.username, role: found.role }))
    if (found.role === 'admin') {
      router.push({ name: 'panel-admin' })
    } else {
      router.push({ name: 'panel-bombero' })
    }
  } else {
    alert('Usuario o contraseña incorrectos')
  }
}
</script>

<style scoped>
.center-screen {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f5f7;
}

.login-container-2col {
  display: flex;
  width: 800px;
  max-width: 100vw;
  min-height: 450px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  overflow: hidden;
}

.login-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 30px;
  background: #fff;
}

.login-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #FF4B2B, #FF416C);
  color: #fff;
  padding: 40px 30px;
}

.login-right h1 {
  font-weight: bold;
  margin-bottom: 10px;
}

.login-right p {
  font-size: 15px;
  font-weight: 100;
  line-height: 22px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  text-align: center;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #222;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 10px 0 20px 0;
  align-self: flex-end;
}

button {
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: #FF4B2B;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 10px;
  width: 100%;
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 5px;
  font-size: 15px;
}
</style> 