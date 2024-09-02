export type Message = {
	id: number;
	host: boolean;
	avatar: string;
	username: string;
	timestamp: string;
	message: string;
	// userId: number;
	// channelId: number;
	// channel: Channel;
};

export type Channel = {
	id: number;
	name: string;
	users: User[];
	messages: Message[];
};

export type User = {
	id: number;
	email: string;
	name: string;
	messages: Message[];
	channels: Channel[];
};
