import { request } from "./utils/request";

// get all contacts
export const getContacts = async() => {
	const reqUrl = "/api/contact/find-all";
	try {
		const data = await request(reqUrl, {
            method: "GET",
        });	
		return data;
	} catch (error) {
		console.error("error occurred in search service...");
	}
}

// add a contact
export const addContact = async(params) => {
    console.log({params});
	const reqUrl = "/api/contact/register";
	try {
		const data = await request(reqUrl, {
            method: "POST",
            body: params
        });	
		return data;
	} catch (error) {
		console.error("error occurred in search service...");
	}
}

// update a contact
export const editContact = async(id, params) => {
	const reqUrl = "/api/contact/update?id="+id;
	try {
		const data = await request(reqUrl, {
            method: "PUT",
            body: params
        });	
		return data;
	} catch (error) {
		console.error("error occurred in search service...");
	}
}

// delete a contact
export const deleteContact = async(id, params) => {
	const reqUrl = "/api/contact/delete?id="+id;
	try {
		const data = await request(reqUrl, {
            method: "DELETE",
        });	
		return data;
	} catch (error) {
		console.error("error occurred in search service...");
	}
}

// find a contact
export const find_A_Contact = async(params) => {
	const reqUrl = "/api/contact/find-one?mobile="+params?.mobile_number;
	try {
		const data = await request(reqUrl, {
            method: "GET",
        });	
		return data;
	} catch (error) {
		console.error("error occurred in search service...");
	}
}