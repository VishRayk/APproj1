<?php
session_start();
if (isset($_SESSION["user"])) {
   header("Location: index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="another.css">
    <style>
        .container{
            border:2px solid white;
            border-radius: 2%;
        }
    </style>
</head>
<body>
   
    <div class="container">
        <?php
        if (isset($_POST["submit"])) {
           $fullName = $_POST["fullname"];
           $email = $_POST["email"];
           $password = $_POST["password"];
           $passwordRepeat = $_POST["repeat_password"];
           
           $passwordHash = password_hash($password, PASSWORD_DEFAULT);

           $errors = array();
           
           if (empty($fullName) OR empty($email) OR empty($password) OR empty($passwordRepeat)) {
            array_push($errors,"All fields are required");
           }
           if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            array_push($errors, "Email is not valid");
           }
           if (strlen($password)<8) {
            array_push($errors,"Password must be at least 8 charactes long");
           }
           if ($password!==$passwordRepeat) {
            array_push($errors,"Password does not match");
           }
           require_once "database.php";
           $sql = "SELECT * FROM users WHERE email = '$email'";
           $result = mysqli_query($conn, $sql);
           $rowCount = mysqli_num_rows($result);
           if ($rowCount>0) {
            array_push($errors,"Email already exists!");
           }
           if (count($errors)>0) {
            foreach ($errors as  $error) {
                echo "<div class='alert alert-danger'>$error</div>";
            }
           }else{
            
            $sql = "INSERT INTO users (full_name, email, password) VALUES ( ?, ?, ? )";
            $stmt = mysqli_stmt_init($conn);
            $prepareStmt = mysqli_stmt_prepare($stmt,$sql);
            if ($prepareStmt) {
                mysqli_stmt_bind_param($stmt,"sss",$fullName, $email, $passwordHash);
                mysqli_stmt_execute($stmt);
                echo "<div class='alert alert-success'>You are registered successfully.</div>";
            }else{
                die("Something went wrong");
            }
           }
          

        }
        ?>
      <div class="ear ear--left"></div>
      <div class="ear ear--right"></div>
      <div class="face">
        <div class="eyes">
          <div class="eye eye--left">
            <div class="glow"></div>
          </div>
          <div class="eye eye--right">
            <div class="glow"></div>
          </div>
        </div>
        <div class="nose">
          <svg width="38.161" height="22.03">
            <path
              d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z"
              fill="#243946"
            ></path>
          </svg>
          <div class="glow"></div>
        </div>
        <div class="mouth">
          <svg class="smile" viewBox="-2 -2 84 23" width="84" height="23">
            <path
              d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161"
              fill="none"
              stroke-width="3"
              stroke-linecap="square"
              stroke-miterlimit="3"
            ></path>
          </svg>
          <div class="mouth-hole"></div>
          <div class="tongue breath">
            <div class="tongue-top"></div>
            <div class="line"></div>
            <div class="median"></div>
          </div>
        </div>
      </div>
      <div class="tengah">
        <div class="hands">
          <div class="hand hand--left">
            <div class="finger">
              <div class="bone"></div>
              <div class="nail"></div>
            </div>
            <div class="finger">
              <div class="bone"></div>
              <div class="nail"></div>
            </div>
            <div class="finger">
              <div class="bone"></div>
              <div class="nail"></div>
            </div>
          </div>
          <div class="hand hand--right">
            <div class="finger">
              <div class="bone"></div>
              <div class="nail"></div>
            </div>
            <div class="finger">
              <div class="bone"></div>
              <div class="nail"></div>
            </div>
            <div class="finger">
              <div class="bone"></div>
              <div class="nail"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- SVG Image End -->

      <!-- Form Start -->
      <div class="tengah">
        <form action="registration.php" method="post" >
        <div class="login">
        <label>
            <div class="fas fa-user"></div>
            <input
              class="username"
              type="text"
              autocomplete="on"
              placeholder="Name"
              name="fullname"
            />
          </label>
          <label>
            <div class="fas fa-user"></div>
            <input
              class="username"
              type="text"
              autocomplete="on"
              placeholder="Email"
              name="email"
            />
          </label>
          <label>
            <div class="fas fa-lock"></div>
            <input
              class="password"
              type="password"
              autocomplete="off"
              placeholder="password"
              name="password"
            />
    
          </label>
          <label>
            <div class="fas fa-lock"></div>
            <input
              class="password"
              type="password"
              autocomplete="off"
              placeholder="password"
              name="repeat_password"
            />
            
          </label>
            <input type="submit" value="Register" name="submit" class="login-button">
            </form>
      </div>
     </div>
      <!-- Form End -->

      <!-- Footer Start  -->
      <div class="footer">
        <div class="footer-a"><p>Already Registered <a href="login.php">Login Here</a></p></div>
      </div>
    </div>
    <!-- Footer End -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.min.js"></script>
</body>
<script src="app.js"></script>
</html>