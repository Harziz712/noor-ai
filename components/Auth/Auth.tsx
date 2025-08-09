"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Login from "./Login";
import SignUp from "./SignUp";



export default function Auth() {


    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Welcome</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <Login /> 
                            {/* <h2>login</h2> */}
                        </TabsContent>
                        <TabsContent value="signup">
                            <SignUp />
                             {/* <h2>signup</h2> */}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}