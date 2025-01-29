const API_URL = "http://localhost:5000";

export const handleLogin = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    const token = data.token;

    // Store the token in localStorage
    localStorage.setItem("jwt", token); //TO DO: implement token expiration and refresh
  } else {
    // Handle login error
    console.error("Login failed");
  }
};

export const getAllQuestions = async () => {
  // const token = localStorage.getItem("jwt");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNfaWQiOiJjYzdiYzY4Yi0wY2Y5LTQwMzktOGNhOC04ODFjZjYyZTgwYjEiLCJleHAiOjE3Mzc1Nzk3NjF9.FdLvYTjWBHIvV0IPJXMyadShrmVdDTFUBJd5s_dXJIQ";
  const response = await fetch(`${API_URL}/allQuestions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    // Handle error (e.g., token expired)
    console.error("Failed to fetch protected data");
  }
};
