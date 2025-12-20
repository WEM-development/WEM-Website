"use client";

import { Avatar } from "@heroui/react";
import { User } from "../Models";

interface UserListProps {
    users: User[] | undefined;
}

export default function UserList({ users }: UserListProps) {
    return (
        <div>
            {users?.map(user => (
                <div key={user.uid} className="flex flex-row items-center gap-2 my-2">
                    <Avatar name={`${user.firstName} ${user.lastName}`}/>
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                </div>
            ))}
        </div>
    );
}
