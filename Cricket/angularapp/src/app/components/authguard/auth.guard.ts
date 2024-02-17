import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const url: string = state.url;
    const user = localStorage.getItem('userRole');

    if (user) {
      console.log(user);
      
      if (this.isAdminRoute(url) && user != 'Admin') {
        console.log("Organizer entering in admin route");
        this.router.navigate(['/error']);
        return false;
      }

      if (this.isOrganizerRoute(url) && user != 'Organizer') {
        console.log("admin entering in Organizer route");
        this.router.navigate(['/error']);
        return false;
      }
  
      if (this.isCommonRoute(url)) {
        return true;
      }

      // Navigate to not found page if user tries to access a page where they do not have access
      return true;
    }

    // Navigate to login page if user is not authenticated
    this.router.navigate(['/login']);
    return false;
  }

  private isAdminRoute(url: string): boolean {
    const adminRoutes = ['admin/dashboard', 'admin/add/boat', 'admin/view/boat', 'admin/view/bookings'];
    return adminRoutes.some(route => url.includes(route));
  }

  private isOrganizerRoute(url: string): boolean {
    const OrganizerRoutes = ['organizer/dashboard', 'organizer/view/boat', 'organizer/add/booking', 'organizer/view/bookings'];
    return OrganizerRoutes.some(route => url.includes(route));
  }

  private isCommonRoute(url: string): boolean {
    const commonRoutes = ['', 'login','signup'];  
    return commonRoutes.some(route => url.includes(route));
  }
}