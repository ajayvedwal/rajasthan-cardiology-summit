// ========== Rajasthan Cardiology Summit JavaScript ==========

// ------------------Initialize Firebase SDK Backend-------------------------
var firebaseConfig = {
  apiKey: "AIzaSyBpsfs21-nfTHTanDBkYuXhmjivmyKf9qo",
  authDomain: "rajasthancardiologysummit.firebaseapp.com",

  databaseURL: "https://rajasthancardiologysummit-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rajasthancardiologysummit",
  storageBucket: "rajasthancardiologysummit.appspot.com",
  messagingSenderId: "933647173687",
  appId: "1:933647173687:web:2dac7c3950c047bf21d7b2"
};

firebase.initializeApp(firebaseConfig);


// -------------------- Form Validation --------------------
function validateForm() {
  const mobile = document.getElementById('mobile').value;
  const email = document.getElementById('email').value;

  const mobilePattern = /^[0-9]{10}$/;
  if (!mobilePattern.test(mobile)) {
    alert('Please enter a valid 10-digit mobile number.');
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  return true;
}


// ----------------------Handle Contact Form Submission----------------------

function handleContactForm(e) {
  e.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const phonePattern = /^[0-9]{10}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !phone || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  if (!phonePattern.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const contactData = {
    name,
    phone,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  firebase.database().ref("contacts").push(contactData, error => {
    if (error) {
      alert("Failed to send your message. Please try again.");
    } else {
      alert("Thank you! Your message has been submitted.");
      document.getElementById("contact-form").reset();
    }
  });
}






// -------------------- Contact Form Validation --------------------
function validateContactForm() {
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    alert('Please enter a valid 10-digit mobile number.');
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  return true;
}

// -------------------- Admin Login --------------------
// Admin Script - script.js

function validateAdminLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const expectedHash = "fb2a50a9d5377833e37aaaa4712ec5a1";
  const passwordHash = CryptoJS.MD5(password).toString();

  if (username === "admin" && passwordHash === expectedHash) {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin-dashboard.html";
    return false;
  } else {
    alert("Invalid username or password");
    return false;
  }
}

function togglePassword() {
  const passwordField = document.getElementById("password");
  const toggleBtn = document.querySelector(".toggle-password");
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  toggleBtn.textContent = type === "password" ? "Show" : "Hide";
}




function logoutAdmin() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}

function renderSavedSessions() {
  const container = document.getElementById("saved-sessions");
  if (!container) return;

  const data = JSON.parse(localStorage.getItem("scientificProgram")) || { day1: [], day2: [] };
  container.innerHTML = "";

  ['day1', 'day2'].forEach((dayKey, index) => {
    const dayBlock = document.createElement("div");
    dayBlock.innerHTML = `<h4>Day ${index + 1}</h4>`;

    data[dayKey].forEach((session, sIndex) => {
      const box = document.createElement("div");
      box.innerHTML = `<strong>Session ${sIndex + 1}</strong>: ${session.title}`;

      const btnEdit = document.createElement("button");
      btnEdit.innerHTML = '<i class="fas fa-edit"></i>';
      btnEdit.className = "btn-icon";
      btnEdit.title = "Edit Session";
      btnEdit.onclick = () => {
        alert("Edit functionality coming soon."); // Optional message or action
      };
      
      const btnDelete = document.createElement("button");
      btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
      btnDelete.className = "btn-icon delete";
      btnDelete.title = "Delete Session";
      btnDelete.onclick = () => {
        if (confirm("Are you sure you want to delete this session?")) {
          firebase.database().ref("scientificProgram").child(session.id).remove().then(() => {
            renderSavedSessions();
          });
        }
      };
      
      box.appendChild(btnEdit);
      box.appendChild(btnDelete);
      
      dayBlock.appendChild(box);
    });
    container.appendChild(dayBlock);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("saved-sessions")) {
    renderSavedSessions();
  }

  if (document.getElementById("sessions-day-1")) {
    displayScientificProgram(); // ✅ For homepage
  }
});




// -------------------------------Handle Registration Form Submission by Firebase Backend-------------------------------
function handleRegistration(e) {
  e.preventDefault();

  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const state = document.getElementById("state").value.trim();
  const city = document.getElementById("city").value.trim();
  const gender = document.querySelector("input[name='gender']:checked");
  const assistance = document.querySelector("input[name='assistance']:checked");

  if (!firstName || !lastName || !mobile || !email || !address || !state || !city || !gender || !assistance) {
    alert("Please fill in all required fields.");
    return;
  }

  const mobilePattern = /^[0-9]{10}$/;
  if (!mobilePattern.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const data = {
    name: "Dr. " + firstName + " " + lastName,
    gender: gender.value,
    mobile,
    email,
    address,
    state,
    city,
    assistance: assistance.value,
    timestamp: new Date().toISOString()
  };

  const dbRef = firebase.database().ref("registrations");

  // Check for duplicate mobile number
  dbRef.orderByChild("mobile").equalTo(mobile).once("value", snapshot => {
    if (snapshot.exists()) {
      alert("This mobile number is already registered.");
    } else {
      dbRef.push(data, error => {
        if (error) {
          alert("Error saving your registration. Please try again.");
        } else {
          alert("You registered successfully for Rajasthan Cardiology Summit 2025.");
          document.getElementById("registration-form").reset();

          // Optional: refresh admin view if open
          if (document.getElementById("program-content")) {
            renderRegisteredMembers();
          }
        }
      });
    }
  });
}




// -------------------- Download Registration --------------------
function downloadRegistrations() {
  const data = JSON.parse(localStorage.getItem("registrations")) || [];

  if (data.length === 0) {
    alert("No registration data found!");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
  XLSX.writeFile(workbook, "RajasthanCardiology_Registrations.xlsx");
}

// -------------------- Logout Admin --------------------
function logoutAdmin() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}

// -------------------- Hero Slider --------------------
let heroIndex = 0;
function switchHeroSlides() {
  const slides = document.querySelectorAll('.hero-slide');
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === heroIndex) slide.classList.add('active');
  });
  heroIndex = (heroIndex + 1) % slides.length;
}
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 0) {
    slides[0].classList.add('active');
    setInterval(switchHeroSlides, 4000);
  }
}

// -------------------- Admin Hidden Shortcut --------------------
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.shiftKey && e.key === "A") {
    window.location.href = "admin-login.html";
  }
});

// -------------------- Session Editor --------------------
function addTopic() {
  const container = document.getElementById("topics-container");
  const topicDiv = document.createElement("div");
  topicDiv.classList.add("form-group-full");
  topicDiv.style.marginBottom = "15px";
  topicDiv.innerHTML = `
    <input type="text" placeholder="Time (e.g. 09:00 AM)" class="topic-time" required>
    <input type="text" placeholder="Duration (e.g. 30 min)" class="topic-duration" required>
    <input type="text" placeholder="Topic Title" class="topic-title" required>
    <input type="text" placeholder="Speaker Name" class="topic-speaker" required>
  `;
  container.appendChild(topicDiv);
}


// -----------------------------Save Session for Firebase SDK-----------------------

function saveSession() {
  const day = document.getElementById("program-day").value;
  const sessionTitle = document.getElementById("session-title").value.trim();

  if (!sessionTitle) {
    alert("Please enter a session title.");
    return;
  }

  const topicDivs = document.querySelectorAll("#topics-container .form-group-full");
  let topics = [];

  topicDivs.forEach(div => {
    const time = div.querySelector(".topic-time").value.trim();
    const duration = div.querySelector(".topic-duration").value.trim();
    const topic = div.querySelector(".topic-title").value.trim();
    const speaker = div.querySelector(".topic-speaker").value.trim();

    if (time && duration && topic && speaker) {
      topics.push({ time, duration, topic, speaker });
    }
  });

  if (topics.length === 0) {
    alert("Please add at least one complete topic.");
    return;
  }

  const session = { day, title: sessionTitle, topics };

  // Save to Firebase
  firebase.database().ref("scientificProgram").push(session, error => {
    if (error) {
      alert("Error saving session. Please try again.");
    } else {
      alert("Session saved successfully!");
      document.getElementById("session-title").value = "";
      document.getElementById("topics-container").innerHTML = "<h4>Topics in this Session</h4>";
      renderSavedSessions();
    }
  });
}



// ---------------------------Session Viewer for Firebase SDK -----------------------------


function renderSavedSessions() {
  const container = document.getElementById("saved-sessions");
  if (!container) return;

  const dbRef = firebase.database().ref("scientificProgram");

  dbRef.once("value", snapshot => {
    const data = { day1: [], day2: [] };

    snapshot.forEach(childSnapshot => {
      const session = childSnapshot.val();
      session.id = childSnapshot.key;
      if (data[session.day]) {
        data[session.day].push(session);
      }
    });

    container.innerHTML = "";

    ['day1', 'day2'].forEach((dayKey, index) => {
      const dayBlock = document.createElement("div");
      dayBlock.innerHTML = `<h4>Day ${index + 1}</h4>`;

      data[dayKey].forEach((session, sIndex) => {
        const box = document.createElement("div");
        box.innerHTML = `<strong>Session ${sIndex + 1}</strong>: ${session.title}`;

        // ✅ Edit button
        const btnEdit = document.createElement("button");
        btnEdit.innerHTML = '<i class="fas fa-edit"></i>';
        btnEdit.className = "btn-icon";
        btnEdit.title = "Edit Session";
        btnEdit.onclick = () => {
          document.getElementById("program-day").value = dayKey;
          document.getElementById("session-title").value = session.title;

          const container = document.getElementById("topics-container");
          container.innerHTML = "<h4>Topics in this Session</h4>";

          session.topics.forEach(topic => {
            const div = document.createElement("div");
            div.classList.add("form-group-full");
            div.innerHTML = `
              <input type="text" value="${topic.time}" class="topic-time" required>
              <input type="text" value="${topic.duration}" class="topic-duration" required>
              <input type="text" value="${topic.topic}" class="topic-title" required>
              <input type="text" value="${topic.speaker}" class="topic-speaker" required>
            `;
            container.appendChild(div);
          });

          // delete session from firebase for now
          firebase.database().ref("scientificProgram").child(session.id).remove().then(() => {
            renderSavedSessions();
          });
        };

        // ✅ Delete button
        const btnDelete = document.createElement("button");
        btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
        btnDelete.className = "btn-icon delete";
        btnDelete.title = "Delete Session";
        btnDelete.onclick = () => {
          if (confirm("Are you sure you want to delete this session?")) {
            firebase.database().ref("scientificProgram").child(session.id).remove().then(() => {
              renderSavedSessions();
            });
          }
        };

        box.appendChild(btnEdit);
        box.appendChild(btnDelete);
        dayBlock.appendChild(box);
      });

      container.appendChild(dayBlock);
    });
  });
}




// --------------------------Session Editor-------------------------------


function loadSessionToEditor(day, sessionIndex) {
  const data = JSON.parse(localStorage.getItem("scientificProgram")) || { day1: [], day2: [] };
  const session = data[day][sessionIndex];

  document.getElementById("program-day").value = day;
  document.getElementById("session-title").value = session.title;
  const container = document.getElementById("topics-container");
  container.innerHTML = "<h4>Topics in this Session</h4>";

  session.topics.forEach(topic => {
    const div = document.createElement("div");
    div.classList.add("form-group-full");
    div.innerHTML = `
      <input type="text" value="${topic.time}" class="topic-time" required>
      <input type="text" value="${topic.duration}" class="topic-duration" required>
      <input type="text" value="${topic.topic}" class="topic-title" required>
      <input type="text" value="${topic.speaker}" class="topic-speaker" required>
    `;
    container.appendChild(div);
  });

  data[day].splice(sessionIndex, 1);
  localStorage.setItem("scientificProgram", JSON.stringify(data));
}






// ---------------------------Display Scientific Program-----------------------------

function displayScientificProgram() {
  const container1 = document.getElementById("sessions-day-1");
  const container2 = document.getElementById("sessions-day-2");
  if (!container1 || !container2) return;

  firebase.database().ref("scientificProgram").once("value", snapshot => {
    const data = { day1: [], day2: [] };

    snapshot.forEach(child => {
      const session = child.val();
      if (data[session.day]) {
        data[session.day].push(session);
      }
    });

    container1.innerHTML = "";
    container2.innerHTML = "";

    ["day1", "day2"].forEach((day, i) => {
      const container = i === 0 ? container1 : container2;

      data[day].forEach((session, j) => {
        const sessionDiv = document.createElement("div");
        sessionDiv.className = "session";

        const sessionTitle = document.createElement("h4");
        sessionTitle.innerText = `Session ${j + 1}: ${session.title}`;

        const ul = document.createElement("ul");
        session.topics.forEach(topic => {
          const li = document.createElement("li");
          li.innerText = `${topic.time} | ${topic.duration} | ${topic.topic} | ${topic.speaker}`;
          ul.appendChild(li);
        });

        sessionDiv.appendChild(sessionTitle);
        sessionDiv.appendChild(ul);
        container.appendChild(sessionDiv);
      });
    });
  });
}






// --------------------------------Load Registered Data in Admin Panel from Firebase------------------------

function renderRegisteredMembers() {
  const container = document.getElementById("program-content");
  if (!container) return;

  const dbRef = firebase.database().ref("registrations");

  dbRef.once("value", snapshot => {
    const data = [];
    snapshot.forEach(childSnapshot => {
      data.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    if (data.length === 0) {
      container.innerHTML = "<p>No registered members found.</p>";
      return;
    }

    let html = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Address</th>
            <th>State</th>
            <th>City</th>
            <th>Assistance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
    `;

    data.forEach((entry, index) => {
      html += `
        <tr>
          <td>${entry.name}</td>
          <td>${entry.gender}</td>
          <td>${entry.mobile}</td>
          <td>${entry.email}</td>
          <td>${entry.address}</td>
          <td>${entry.state}</td>
          <td>${entry.city}</td>
          <td>${entry.assistance}</td>
          <td>
            <button class="btn-delete" onclick="deleteRegistration('${entry.id}')">Delete</button>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
  });
}







// --------------------------Delete Registration Data in admin dashboard from Firebase-----------------------------


function deleteRegistration(id) {
  if (confirm("Are you sure you want to delete this registration?")) {
    firebase.database().ref("registrations").child(id).remove()
      .then(() => {
        alert("Registration deleted successfully.");
        renderRegisteredMembers(); // Refresh the table
      })
      .catch(() => {
        alert("Failed to delete. Please try again.");
      });
  }
}






// --------------------Registration Data-----to filter data on search------------------------

function searchRegistrations() {
  const keyword = document.getElementById("search-bar").value.toLowerCase();
  const rows = document.querySelectorAll("#program-content table tbody tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(keyword) ? "" : "none";
  });
}



// -------------------- Event Listeners --------------------

window.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  if (document.getElementById("saved-sessions")) renderSavedSessions();
  if (document.getElementById("sessions-day-1")) displayScientificProgram();
  if (document.getElementById("program-content")) renderRegisteredMembers();
});
