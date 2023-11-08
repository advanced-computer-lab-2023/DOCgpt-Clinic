import  nodemailer from "nodemailer";

export const sendOTPByEmail = async (email : string , subject : string, text :any ) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com" ,
			service: "Gmail" ,
			port: 587,
			secure: false ,
			auth: {
				user:"shahenda.maisara@gmail.com",
				pass: "dacs ntqi tmcd bjcx",
			},
		});

		await transporter.sendMail({
			from:"shahenda.maisara@gmail.com" ,
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