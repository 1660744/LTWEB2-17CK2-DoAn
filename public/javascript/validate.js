

//Xóa hiển thị lỗi
function ClearError(errMsg, input) {
    input.classList.remove('border-danger')
    document.getElementById(errMsg).innerHTML = '';
}



//kiểm tra input trước khi submit
//Trang sửa bài viết của nhà báo
function Validate_Submit_EditNews() {
    let isValid = true;
    let a = document.getElementsByTagName("small");
    for (i = 0; i < a.length; i++) {
        a[i].innerHTML = "";
    }
    const title = document.getElementById('txtTitle'),
        tinyDes = document.getElementById('txtTinyDes'),
        fullDes = tinymce.get("txtFullDes").getContent(),
        img = document.getElementsByTagName('img'),
        tag = document.getElementsByClassName('tag'),
        cat = document.getElementById('lbcat'),
        releasedate = document.getElementById('releaseDate') || null;
    // console.log(cat.value);
    if (cat.value == '') {
        cat.classList.add("border-danger");
        document.getElementById('err_cat').innerHTML = 'Chưa chọn danh mục';
        cat.scrollIntoView();
        isValid = false;
    }

    if (title.value == '') {
        title.classList.add("border-danger");
        document.getElementById('err_Title').innerHTML = 'Tiêu đề không được trống';
        title.scrollIntoView();
        isValid = false;
    }
    if (tag.length == 0) {
        document.getElementById('err_Tag').innerHTML = 'Phải có ít nhất 1 nhãn tag';
        document.getElementById('err_Tag').scrollIntoView();
        isValid = false;
    }
    if (tinyDes.value == '') {
        tinyDes.classList.add("border-danger");
        document.getElementById('err_TinyDes').innerHTML = 'Nội dung tóm tắt không được trống';
        tinyDes.scrollIntoView();
        isValid = false;
    }
    if (fullDes == '') {
        document.getElementById('err_FullDes').innerHTML = 'Nội dung bài báo không được trống';
        document.getElementById('err_FullDes').scrollIntoView();
        isValid = false;
    }
    if (fullDes.length <= 100 && fullDes.length != 0) {
        document.getElementById('err_FullDes').innerHTML = 'Phải có ít nhất 100 từ';
        document.getElementById('err_FullDes').scrollIntoView();
        isValid = false;
    }

    if (img.length < 2) {
        // title.classList.add("border-danger");
        document.getElementById('err_IMG').innerHTML = 'Thiếu ảnh bìa bài báo';
        document.getElementById('err_IMG').scrollIntoView();
        isValid = false;
    }
    if (releasedate !== null) {
        if (releasedate.value == '') {
            releasedate.classList.add("border-danger");
            document.getElementById('err_ReleaseDate').innerHTML = 'không được để trống';
            isValid = false;
        }
    }

    if (isValid == true)
        document.getElementById("frmEditNews").submit();
}

//xử lý phê duyệt bài báo của BTV
function Validate_Submit_AcceptNews() {
    let isValid = true;
    let a = document.getElementsByTagName("small");
    for (i = 0; i < a.length; i++) {
        a[i].innerHTML = "";
    }
    const releasedate = document.getElementById('releaseDate'),
        tag = document.getElementsByClassName('tag');
    console.log(tag);
    if (tag.length < 1) {
        document.getElementById('err_Tag').innerHTML = 'Phải có ít nhất 1 nhãn tag';
        // document.getElementById('err_Tag').scrollIntoView();
        isValid = false;
    }
    // var d = new Date(releasedate.value);
    // console.log(d);
    // console.log(d.isValid);
    if (releasedate.value == '') {
        document.getElementById('err_ReleaseDate').innerHTML = 'không được để trống';
        // document.getElementById('err_ReleaseDate').scrollIntoView();
        isValid = false;
    }


    if (isValid == true)
        document.getElementById("AcceptedForm").submit();
}

//xử lý từ chối bài báo của BTV
function Validate_Submit_DenyNews() {
    let isValid = true;
    let a = document.getElementsByTagName("small");
    for (i = 0; i < a.length; i++) {
        a[i].innerHTML = "";
    }

    const issu = document.getElementById('txtissue');
    if (issu.value == '') {
        issu.classList.add("border-danger");
        document.getElementById('err_issu').innerHTML = 'Không được để trống';
        // issu.scrollIntoView();
        isValid = false;
    }

    if (isValid == true)
        document.getElementById("DeniedForm").submit();
}
//xử lý đổi mật khẩu profile
function Validate_Profile_Change_pwd() {
    let isValid = true;
    let a = document.getElementsByTagName("small");
    for (i = 0; i < a.length; i++) {
        a[i].innerHTML = "";
    }

    const password = document.getElementById('pwd');
    const newpassword = document.getElementById('newpwd');
    const renewpassword = document.getElementById('repwd');

    if (password.value == '') {
        password.classList.add("border-danger");
        document.getElementById('err_password').innerHTML = 'không được để trống';
        isValid = false;
    } else if (password.value.length < 8) {
        password.classList.add("border-danger");
        document.getElementById('err_password').innerHTML = 'Mật khẩu phải có ít nhất 8 kí tự';
        isValid = false;
    }

    if (newpassword.value == '') {
        newpassword.classList.add("border-danger");
        document.getElementById('err_newpassword').innerHTML = 'không được để trống';
        isValid = false;
    } else if (newpassword.value.length < 8) {
        newpassword.classList.add("border-danger");
        document.getElementById('err_newpassword').innerHTML = 'Mật khẩu phải có ít nhất 8 kí tự';
        isValid = false;
    }

    if (renewpassword.value == '') {
        renewpassword.classList.add("border-danger");
        document.getElementById('err_renewpassword').innerHTML = 'không được để trống';
        isValid = false;
    } else if (renewpassword.value != newpassword.value) {
        renewpassword.classList.add("border-danger");
        document.getElementById('err_renewpassword').innerHTML = 'Mật khẩu không khớp';
        isValid = false;
    }
    if (isValid == true)
        document.getElementById("passwForm").submit();
}
//xử lí thay đổi email
async function Validate_Profile_Change_email() {
    let isValid = true;
    let a = document.getElementsByTagName("small");
    for (i = 0; i < a.length; i++) {
        a[i].innerHTML = "";
    }
    const email = document.getElementById('email');
    if (email.value == '') {
        email.classList.add("border-danger");
        document.getElementById('err_email').innerHTML = 'Email không được trống';
        isValid = false;
    } else {
        await $.getJSON(`/account/isEmail-available?email=${email.value}`, function (data) {
            if (data === false) {
                email.classList.add("border-danger");
                document.getElementById('err_email').innerHTML = 'Email đã được sử dụng';
                isValid = false;
            }
        })
    }

    if (isValid == true)
        document.getElementById("emailForm").submit();
}
//xử lí thay đổi thông tin profile
async function Validate_Profile_Change_info() {
    var isValid = true;
    const username = document.getElementById('userName');
    const fullname = document.getElementById('fullName');
    const pseudonym = document.getElementById('pseudonym');
    const birthday = document.getElementById('birthDate');


    if (username.value == '') {
        username.classList.add("border-danger");
        document.getElementById('err_username').innerHTML = 'không được để trống';
        isValid = false;
    } else {
        await $.getJSON(`/account/is-available?user=${username.value}`, function (data) {
            if (data === false) {
                username.classList.add("border-danger");
                document.getElementById('err_username').innerHTML = 'Tên tài khoản đã tồn tại';
                isValid = false;
            }
        })
    }


    if (birthday.value == '') {
        birthday.classList.add("border-danger");
        document.getElementById('err_birthday').innerHTML = 'không được để trống';
        isValid = false;
    }

    if (fullname.value == '') {
        fullname.classList.add("border-danger");
        document.getElementById('err_fullname').innerHTML = 'không được để trống';
        isValid = false;
    }

    if (pseudonym.value == '') {
        pseudonym.classList.add("border-danger");
        document.getElementById('err_pseudonym').innerHTML = 'không được để trống';
        isValid = false;
    }

    console.log(isValid);
    if (isValid == true)
        document.getElementById("personalForm").submit();
}
//xử lí đăng nhập
function Validate_Submit_Login() {
    var isValid = true;
    const username = document.getElementById('username_log');
    const password = document.getElementById('password_log');

    if (username.value == '') {
        username.classList.add("border-danger");
        document.getElementById('err_username_log').innerHTML = 'Tên tài khoản không được trống';
        isValid = false;
    }

    if (password.value == '') {
        password.classList.add("border-danger");
        document.getElementById('err_password_log').innerHTML = 'Mật khẩu không được trống';
        isValid = false;
    }
    else if (password.value.length < 6) {
        password.classList.add("border-danger");
        document.getElementById('err_password_log').innerHTML = 'Mật khẩu phải có ít nhất 6 kí tự';
        isValid = false;
    }

    console.log(isValid);
    if (isValid == true)
        document.getElementById("loginForm").submit();
}
//xử lí đăng kí
async function Validate_Submit_Register() {
    var isValid = true;
    const username = document.getElementById('username_res');
    const password = document.getElementById('password_res');
    const password2 = document.getElementById('password2');
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const birthday = document.getElementById('birthdate');


    if (username.value == '') {
        username.classList.add("border-danger");
        document.getElementById('err_username_res').innerHTML = 'Tên tài khoản không được trống';
        isValid = false;
    } else {
        await $.getJSON(`/account/is-available?user=${username.value}`, function (data) {
            if (data === false) {
                username.classList.add("border-danger");
                document.getElementById('err_username_res').innerHTML = 'Tên tài khoản đã tồn tại';
                isValid = false;
            }
        })
    }

    if (password.value == '') {
        password.classList.add("border-danger");
        document.getElementById('err_password_res').innerHTML = 'Mật khẩu không được trống';
        isValid = false;
    } else if (password.value.length < 8) {
        password.classList.add("border-danger");
        document.getElementById('err_password_res').innerHTML = 'Mật khẩu phải có ít nhất 8 kí tự';
        isValid = false;
    }

    if (password2.value == '') {
        password2.classList.add("border-danger");
        document.getElementById('err_password2').innerHTML = 'Xác nhận mật khẩu không được trống';
        isValid = false;
    } else if (password2.value != password.value) {
        password2.classList.add("border-danger");
        document.getElementById('err_password2').innerHTML = 'Mật khẩu không khớp';
        isValid = false;
    }

    if (birthday.value == '') {
        birthday.classList.add("border-danger");
        document.getElementById('err_birthday').innerHTML = 'không được để trống';
        isValid = false;
    }

    if (fullname.value == '') {
        fullname.classList.add("border-danger");
        document.getElementById('err_fullname').innerHTML = 'Họ tên không được trống';
        isValid = false;
    }

    if (email.value == '') {
        email.classList.add("border-danger");
        document.getElementById('err_email').innerHTML = 'Email không được trống';
        isValid = false;
    } else {
        await $.getJSON(`/account/isEmail-available?email=${email.value}`, function (data) {
            if (data === false) {
                email.classList.add("border-danger");
                document.getElementById('err_email').innerHTML = 'Email đã được sử dụng';
                isValid = false;
            }
        })
    }

    console.log(isValid);
    if (isValid == true)
        document.getElementById("registerForm").submit();
}
//xử lí quên mật khẩu
async function Validate_Submit_Forgot() {
    var isValid = true;

    const email = document.getElementById('forfot-email');

    if (email.value == '') {
        email.classList.add("border-danger");
        document.getElementById('err_forfot_email').innerHTML = 'Email không được trống';
        isValid = false;
    } else {
        await $.getJSON(`/account/isEmail-available?email=${email.value}`, function (data) {
            if (data === true) {
                email.classList.add("border-danger");
                document.getElementById('err_forfot_email').innerHTML = 'Email chưa được đăng kí';
                isValid = false;
            }
        })
    }

    console.log(isValid);
    if (isValid == true)
        document.getElementById("forgotForm").submit();
}
//Xử lý reset mật khẩu
function Validate_Submit_Reset() {
    var isValid = true;
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');


    if (password.value == '') {
        password.classList.add("border-danger");
        document.getElementById('err_password').innerHTML = 'không được để trống';
        isValid = false;
    }
    else if (password.value.length < 6) {
        password.classList.add("border-danger");
        document.getElementById('err_password').innerHTML = 'Mật khẩu phải có ít nhất 6 kí tự';
        isValid = false;
    }

    if (password2.value == '') {
        password2.classList.add("border-danger");
        document.getElementById('err_password2').innerHTML = 'không được để trống';
        isValid = false;
    }
    else if (password2.value != password.value) {
        password2.classList.add("border-danger");
        document.getElementById('err_password2').innerHTML = 'Mật khẩu không khớp';
        isValid = false;
    }

    console.log(isValid);
    if (isValid == true)
        document.getElementById("resetForm").submit();
}

async function Validate_edit_tag() {
    let isValid = true;
    const tag = document.getElementById('tagname');
    if (tag.value == '') {
        tag.classList.add("border-danger");
        document.getElementById('err_tag').innerHTML = 'không được để trống';
        isValid = false;
    } else {
        const val = tag.value
        await $.getJSON(`/istag-available?tag=${val.toLowerCase()}`, function (data) {
            if (data !== false) {
                tag.classList.add("border-danger");
                document.getElementById('err_tag').innerHTML = 'đã có tag này';
                isValid = false;
            }
        })
    }

    if (isValid == true)
        document.getElementById("tagForm").submit();
}

async function Validate_edit_category() {
    let isValid = true;
    const cat = document.getElementById('catname');
    var e = document.getElementById("lbcat");
    var id = e.options[e.selectedIndex].value;
    if (cat.value == '') {
        cat.classList.add("border-danger");
        document.getElementById('err_cat').innerHTML = 'Không được để trống';
        isValid = false;
    } else {
        const val = cat.value
        await $.getJSON(`/iscat-available?cat=${val}&id=${id}`, function (data) {
            if (data === false) {
                cat.classList.add("border-danger");
                document.getElementById('err_cat').innerHTML = 'Đã có danh mục này';
                isValid = false;
            }
        })
    }

    if (isValid == true)
        document.getElementById("catForm").submit();
}

async function Validate_Edit_UserManager() {
    var isValid = true;
    const username = document.getElementById('username');
    const username_true = document.getElementById('username_true');
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const email_true = document.getElementById('email_true');
    const birthday = document.getElementById('birthdate');


    if (username.value == '') {
        username.classList.add("border-danger");
        document.getElementById('err_username').innerHTML = 'Tên tài khoản không được trống';
        isValid = false;
    } else {
        if (username_true.value != username.value) {
            await $.getJSON(`/account/is-available?user=${username.value}`, function (data) {
                if (data === false) {
                    username.classList.add("border-danger");
                    document.getElementById('err_username').innerHTML = 'Tên tài khoản đã tồn tại';
                    isValid = false;
                }
            })
        }
    }

    if (birthday.value == '') {
        birthday.classList.add("border-danger");
        document.getElementById('err_birthday').innerHTML = 'không được để trống';
        isValid = false;
    }

    if (fullname.value == '') {
        fullname.classList.add("border-danger");
        document.getElementById('err_fullname').innerHTML = 'Họ tên không được trống';
        isValid = false;
    }

    if (email.value == '') {
        email.classList.add("border-danger");
        document.getElementById('err_email').innerHTML = 'Email không được trống';
        isValid = false;
    } else {
        if (email.value != email_true.value) {
            await $.getJSON(`/account/isEmail-available?email=${email.value}`, function (data) {
                if (data === false) {
                    email.classList.add("border-danger");
                    document.getElementById('err_email').innerHTML = 'Email đã được sử dụng';
                    isValid = false;
                }
            })
        }
    }

    if (isValid == true)
        document.getElementById("usermanagerForm").submit();
}

async function Validate_Add_Assign() {
    let isValid = true;
    const us = document.getElementById('userid');
    var e = document.getElementById("lbcat");
    var id = e.options[e.selectedIndex].value;

    const val = us.value
    await $.getJSON(`/isassign-available?us=${val}&id=${id}`, function (data) {
        if (data === false) {
            document.getElementById('err_cat').innerHTML = 'Đã phân công danh mục này';
            isValid = false;
        }
    })

    if (isValid == true)
        document.getElementById("addCatForm").submit();
}

async function Validate_Add_UserManager() {
    var isValid = true;
    const username = document.getElementById('username');

    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');

    const birthday = document.getElementById('birthdate');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    if (username.value == '') {
        username.classList.add("border-danger");
        document.getElementById('err_username').innerHTML = 'Tên tài khoản không được trống';
        isValid = false;
    } else {

        await $.getJSON(`/account/is-available?user=${username.value}`, function (data) {
            if (data === false) {
                username.classList.add("border-danger");
                document.getElementById('err_username').innerHTML = 'Tên tài khoản đã tồn tại';
                isValid = false;
            }
        })

    }

    if (birthday.value == '') {
        birthday.classList.add("border-danger");
        document.getElementById('err_birthday').innerHTML = 'không được để trống';
        isValid = false;
    }

    if (fullname.value == '') {
        fullname.classList.add("border-danger");
        document.getElementById('err_fullname').innerHTML = 'Họ tên không được trống';
        isValid = false;
    }

    if (email.value == '') {
        email.classList.add("border-danger");
        document.getElementById('err_email').innerHTML = 'Email không được trống';
        isValid = false;
    } else {

        await $.getJSON(`/account/isEmail-available?email=${email.value}`, function (data) {
            if (data === false) {
                email.classList.add("border-danger");
                document.getElementById('err_email').innerHTML = 'Email đã được sử dụng';
                isValid = false;
            }
        })

    }
    if (password.value == '') {
        password.classList.add("border-danger");
        document.getElementById('err_password').innerHTML = 'Mật khẩu không được trống';
        isValid = false;
    } else if (password.value.length < 8) {
        password.classList.add("border-danger");
        document.getElementById('err_password').innerHTML = 'Mật khẩu phải có ít nhất 8 kí tự';
        isValid = false;
    }

    if (password2.value == '') {
        password2.classList.add("border-danger");
        document.getElementById('err_password2').innerHTML = 'Xác nhận mật khẩu không được trống';
        isValid = false;
    } else if (password2.value != password.value) {
        password2.classList.add("border-danger");
        document.getElementById('err_password2').innerHTML = 'Mật khẩu không khớp';
        isValid = false;
    }
    if (isValid == true)
        document.getElementById("usermanagerForm").submit();
}




// function checkpassword(password) {
//     var strength = 0;
//     if (password.match(/[a-z]+/)) {
//         strength += 1;
//     }
//     if (password.match(/[A-Z]+/)) {
//         strength += 1;
//     }
//     if (password.match(/[0-9]+/)) {
//         strength += 1;
//     }
//     if (password.match(/[$@#&!]+/)) {
//         strength += 1;

//     }

//     if (password.length < 6) {
//         display.innerHTML = "minimum number of characters is 6";
//     }

//     if (password.length > 12) {
//         display.innerHTML = "maximum number of characters is 12";
//     }

//     switch (strength) {
//         case 0:
//             strengthbar.value = 0;
//             break;
//             switch (strength) {
//                 case 0:
//                     strengthbar.value = 0;
//                     break;

//                 case 1:
//                     strengthbar.value = 25;
//                     break;

//                 case 2:
//                     strengthbar.value = 50;
//                     break;

//                 case 3:
//                     strengthbar.value = 75;
//                     break;

//                 case 4:
//                     strengthbar.value = 100;
//                     break;
//             }
//     }
// }