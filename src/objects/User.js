export default class User {
	constructor(email, name, password, isAdmin = false, organizations = []) {
		this.email = email;
		this.name = name;
		this.isAdmin = isAdmin;
		this.orgIDs = [...organizations, "default"];
		this.password = password;
		this.userID = "firebase will generate this";

		this.saveUser();
	}

	/**
	 * Save user to localStorage
	 */
	saveUser() {
		console.log("User created!");
		localStorage.setItem("user", JSON.stringify(this));
		console.log(this);
	}

	toString() {
		return JSON.stringify(this);
	}

	/* ########################### Getters ########################## */

	/**
	 * Get user's email
	 */
	getEmail() {
		return this.email;
	}

	/**
	 * Get user's name
	 */
	getName() {
		return this.name;
	}

	/**
	 * Get user's admin status
	 */
	isAdmin() {
		return this.isAdmin;
	}

	/**
	 * Get user's organizations
	 */
	getOrganizations() {
		// TODO: these should be Organization objects
		return this.orgIDs;
	}

	/* ########################### Setters ########################## */

	/* ########################### Static Methods ########################## */

	/**
	 * Get user from localStorage
	 */
	static getUser() {
		const user = JSON.parse(localStorage.getItem("user"));

		if (user) {
			console.log("User retrieved!");
			console.log(user);
			return user;
		} else {
			return null;
		}
	}

	/** Check if logged in or not */
	static isLoggedIn() {
		const user = User.getUser();
		if (user) {
			return true;
		} else {
			return false;
		}
	}
}
