document.title = "Đăng nhập - Đăng Ký";
async function submitRegister() {
  let fullName = document.getElementById("userName").value;
  let password = document.getElementById("passW").value;
  let email = document.getElementById("email").value;
  const userNameErrorMessage = document.getElementById("validateUserName");
  const passwordErrorMessage = document.getElementById("validatePassWord");
  const emailErrorMessage = document.getElementById("validateEmail");
  if (!fullName) {
    userNameErrorMessage.innerHTML = "";
    userNameErrorMessage.append("Please type username");
  } else {
    userNameErrorMessage.innerHTML = "";
  }
  if (!password) {
    passwordErrorMessage.innerHTML = "";
    passwordErrorMessage.append("Please type password");
  } else {
    passwordErrorMessage.innerHTML = "";
  }
  if (!email) {
    emailErrorMessage.innerHTML = "";
    emailErrorMessage.append("Please type email");
  } else {
    emailErrorMessage.innerHTML = "";
  }

  if (fullName && password && email) {
    try {
      const userDatas = await (
        await fetch("api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, password, email }), // body data type must match "Content-Type" header
        })
      ).json();
      if (userDatas.message) {
        swal(`${userDatas.message}`, "", "error");
      } else {
        swal("Đăng ký thành công !!", "", "success").then(() => {
          location.reload();
        });
      }
    } catch (e) {
      alert(e.message);
    }
  }
}

async function submitLogin() {
  let fullName = document.getElementById("user").value;
  let password = document.getElementById("pass").value;
  const userNameErrorMessage = document.getElementById("validateUserNamee");
  const passwordErrorMessage = document.getElementById("validatePassWordd");
  if (!fullName) {
    userNameErrorMessage.innerHTML = "";
    userNameErrorMessage.append("Vui lòng nhập tài khoản");
  } else {
    userNameErrorMessage.innerHTML = "";
  }
  if (!password) {
    passwordErrorMessage.innerHTML = "";
    passwordErrorMessage.append("Vui lòng nhập mật khẩu");
  } else {
    passwordErrorMessage.innerHTML = "";
  }

  if (fullName && password) {
    try {
      const userDatas = await (
        await fetch("api/login", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, password }), // body data type must match "Content-Type" header
        })
      ).json();
      if (userDatas.message) {
        swal(`${userDatas.message}`, "", "error");
      } else {
        localStorage.setItem("token", userDatas.token);
        localStorage.setItem("fullname", fullName);
        swal("Đăng nhập thành công !!", "", "success").then(() => {
          window.location.href = "/";
        });
      }
    } catch (e) {
      alert(e.message);
    }
  }
}
$("#backtoHome").css("cursor", "pointer");
$("#backtoHome").click(() => {
  window.location.href = "/";
});


var inputPassword = document.getElementById("pass");
inputPassword.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    //checks whether the pressed key is "Enter"
    submitLogin();
  }
});
