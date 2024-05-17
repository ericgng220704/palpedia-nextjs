export function capitalizeFirstLetter(word) {
     return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export async function createUser(session, status) {
     let user;
     if (session && status === "authenticated") {
          try {
               async function createUser() {
                    const response = await fetch("/api/prisma/newUser", {
                         method: "POST",
                         headers: {
                              "Content-type": "application/json",
                         },
                         body: JSON.stringify({
                              email: session.user.email,
                              name: session.user.name,
                              picture: session.user.picture,
                         }),
                    });

                    const data = await response.json();
                    user = data;
               }

               createUser();

               if (user) {
                    console.log(user);
                    return user;
               }
          } catch (e) {
               throw new Error(e);
          }
     }
}
