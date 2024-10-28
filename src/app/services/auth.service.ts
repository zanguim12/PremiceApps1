import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean = false;
  roles: string | null = null;
  username: string | null = null;
  // accessToken: string | null = null;

  private apiUrl = 'http://localhost:8000'; // JSON Server URL

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(username1: string, password1: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users`)
      .pipe(
        map(users => {
          const user = users.find(u => u.username === username1 && u.password === password1);
          console.log("Matching user: ", user);

          if (user) {
            // User found, create a mock token
            // const mockToken = this.createMockToken(user);
            // console.log("Mock token: ", mockToken);
            // this.loadProfile({ access_token: mockToken });
            this.loadProfile(user);
            return { success: true, user };
          } else {
            return { success: false, message: 'Invalid credentials' };
          }
        })
      );
  }

  // private createMockToken(user: any): string {
  //   const payload = {
  //     sub: user.username,
  //     role: user.role
  //   };
  //   return btoa(JSON.stringify(payload));
  // }

  loadProfile(user: any) {
    console.log("user from loadProfile	: ", user)
    this.isAuth = true;
    // this.accessToken = data['access_token'];
    // try {
    //   let decodedJwt: any = JSON.parse(atob(this.accessToken!));
    //   this.username = decodedJwt.sub;
    //   this.roles = decodedJwt.role;
    //   window.localStorage.setItem("jwt-token", this.accessToken!);
    // } catch (error) {
    //   console.error("Error decoding token:", error);
    //   this.logout(); // Logout if token is invalid
    // }
    this.username = user.username;
    this.roles = user.role;
    window.localStorage.setItem("auth-user", JSON.stringify(user));
  }

  isAdmin(): boolean {
    //console.log("is admin ? ", this.roles === 'ADMIN')
    return this.roles === "ADMIN";
  }

  logout() {
    this.isAuth = false;
    // this.accessToken = null;
    this.username = null;
    this.roles = null;
    // window.localStorage.removeItem("jwt-token");
    window.localStorage.removeItem("auth-user");
    this.router.navigateByUrl("/login")
  }

  loadJwtTokenFromLocalStorage() {
    // const token = window.localStorage.getItem("jwt-token");
    // if (token) {
    //   this.loadProfile({ access_token: token });
    //   if (this.isAdmin()) {
    //     this.router.navigateByUrl("/admin/home");
    //   } else {
    //     this.router.navigateByUrl("/user/home");
    //   }
    // } else {
    //   this.router.navigateByUrl("/login");
    // }
    const user = window.localStorage.getItem("auth-user");
    if (user) {
      this.loadProfile(JSON.parse(user));
      if (this.isAdmin()) {
        this.router.navigateByUrl("/admin/home");
      } else {
        this.router.navigateByUrl("/user/home");
      }
    } else {
      this.router.navigateByUrl("/login");
    }
  }
}
