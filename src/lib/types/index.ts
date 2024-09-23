export type Channel = {
	id: number;
	name?: string;
	owner?: User;
	members?: User[];
	messages?: Message[];
};

export type Message = {
	id: number;
	timestamp?: Date;
	message?: string;
	user?: User;
	channel?: Channel;
	host?: boolean;
	fileUrl?: string;
};

export type User = {
	id: string;
	name?: string;
	email?: string;
	channels?: Channel[];
	messages?: Message[];
	ownChannels?: Channel[];
};
