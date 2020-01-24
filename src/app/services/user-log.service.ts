// Firebase imports
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class UserLogService {
    whoIsThis = new Subject<User>();
    loginStatus = new Subject<string>();
    signupStatus = new Subject<string>();
    connection = 'https://us-central1-enigma-ng.cloudfunctions.net/api';
    userUid: string;

    constructor(
        private router: Router,
        private http: HttpClient,
        private ngZone: NgZone,
        private afa: AngularFireAuth
    ) { }

    checkSignedUserStatusAndSignTheUnauthorizedOut() {
        const thisthis = this;
        this.afa.auth.onAuthStateChanged(fetchedUser => {
            // First check if a user is logged in serverside
            if (!fetchedUser) {
                thisthis.clearLocalStorage();
                thisthis.ngZone.run(() => thisthis.router.navigate(['/login']));
                return
            }
            try {
                if (typeof (localStorage.getItem('uid')) !== 'string') {
                    throw 'No valid uid detected !!';
                }
                const uid = atob(localStorage.getItem('uid'))
                if (fetchedUser.uid === uid) {
                    console.log('Granted !!');
                    const user = {
                        displayName: fetchedUser.displayName,
                        email: fetchedUser.email,
                        photoURL: fetchedUser.photoURL,
                        uid: fetchedUser.uid
                    }
                    const isAuthenticated = localStorage.getItem('isAuthenticated')
                    thisthis.setUser(user);
                    if (isAuthenticated !== 'true') {
                        window.location.reload();
                    };
                } else {
                    console.log('Not this user!');
                    thisthis.logout(true);
                    return
                }
            } catch {
                error => {
                    console.log(error)
                    thisthis.logout(false)
                }
            }
        });
    }

    isAuthenticated() {
        const authStatus = localStorage.getItem('isAuthenticated');
        if (authStatus === 'false' || !authStatus) {
            return false;
        } else {
            return true;
        }
    }

    async login(email: string, password: string) {
        this.loginStatus.next('trying');
        await this.afa.auth
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                this.loginStatus.next('successful');
                this.setUser({
                    displayName: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL,
                    uid: res.user.uid
                });
                this.router.navigate(['/home/challenges']);
            }).catch(error => {
                this.loginStatus.next('failure');
                console.log('Can\'t log in!!');
            });
    }

    signNewUserUp(newUser: {}) {
        this.signupStatus.next('trying');
        return this.http.post(this.connection + '/users', newUser).subscribe(res => {
            this.signupStatus.next('successful');
            this.router.navigate(['/home/challenges']);
        },
            error => {
                this.signupStatus.next('failure')
            });
    }

    setUser(user: User) {
        this.whoIsThis.next(user);
        this.userUid = user.uid;
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('displayName', user.displayName);
        localStorage.setItem('email', user.email);
        localStorage.setItem('photoURL', user.photoURL);
        localStorage.setItem('uid', btoa(user.uid));
    }

    getUserUid() {
        return this.userUid;
    }

    async logout(reload: boolean) {
        try {
            await this.afa.auth.signOut();
            console.log('logout !!');
            this.clearLocalStorage();
            this.router.navigate(['/login']);
            if (reload === true) {
                window.location.reload()
            }
        } catch (err) {
            console.log('Error logging out !!')
        }

    }

    clearLocalStorage() {
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('displayName');
        localStorage.removeItem('email');
        localStorage.removeItem('photoURL');
        localStorage.removeItem('uid');
    }

    signForTheChallenge(challengeId: string, gameId: string) {
        // this.signupStatus.next('trying');
        return this.http.post(this.connection + '/challenges/sign', { cid: challengeId, gid: gameId }).subscribe(res => {
            // this.signupStatus.next('successful');
            // this.router.navigate(['/home/challenges']);
            window.location.reload();
        },
            error => {
                console.log(error)
                // this.signupStatus.next('failure')
            });
    }

    getUsers(array: Array<string>) {
        return this.http.get(this.connection + '/users?array=' + array)
    }

    updateUser(newProfileConfig: { photoURL: string, displayName: string, email: string }) {
        this.http.patch(this.connection + '/users/',
            newProfileConfig).subscribe(() => {
                window.location.reload()
                // this.getGamesAPI().then(games => {
                //     this.games = games;
                //     this.gamesUpdated.next([...this.games]);
                // });
            },
                error => {
                    console.log('Unable to update user!')
                    console.log(error)
                })
    }
}