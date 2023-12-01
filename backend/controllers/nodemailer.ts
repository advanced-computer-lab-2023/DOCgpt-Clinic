import  nodemailer from "nodemailer";

export const sendAnEmail = async (email : string , subject : string, text :any ) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com" ,
			service: "Gmail" ,
			port: 587,
			secure: false ,
			auth: {
				user:"docgpt7@gmail.com",
				pass: "uvmd bdfx iypf flvo",
			},
		});

		await transporter.sendMail({
			from:"docgpt Clinic" ,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};