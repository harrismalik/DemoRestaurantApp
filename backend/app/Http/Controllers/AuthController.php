<?php

namespace App\Http\Controllers;

use App\Models\PasswordResetToken;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseAPIController
{
    public function register(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string',
            'repeat_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Failed.');
        }

        $existingUser = User::where('email', $request['email'])->first();
        if($existingUser) {
            return $this->sendError('Email already exists.');
        }

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password'])
        ]);

        $response['token'] =  $user->createToken($request['email'])->accessToken;
        $response['name'] =  $user->name;
        $response['email'] =  $user->email;

        return $this->sendResponse($response, 'Successfully registered.');
    }

    public function login(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Failed.');
        }

        $user = User::where('email', $request['email'])->first();
        if(!$user) {
            return $this->sendError('Email not registered.');
        }

        if(!Hash::check($request['password'], $user['password'])) {
            return $this->sendError('Wrong credentials.');
        }

        $response['token'] =  $user->createToken($user->email)-> accessToken;
        $response['name'] =  $user->name;
        $response['email'] =  $user->email;
        return $this->sendResponse($response, 'Login successful.');
    }

    public function logout(): JsonResponse {
        auth()->user()->tokens()->delete();
        return $this->sendResponse(null, 'Successfully logged out');
    }

    public function refresh(): JsonResponse {
        $user = auth()->user();
        $response['token'] =  $user->createToken($user->email)-> accessToken;
        return $this->sendResponse($response, 'New token assigned.');
    }

    public function forgotPassword(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Failed.');
        }

        $user = User::where('email', $request['email'])->first();
        if(!$user) {
            return $this->sendError('Email not registered.');
        }

        $resetToken = PasswordResetToken::where('email', $request['email'])->first();
        if(!$resetToken) {
            $resetToken = new PasswordResetToken();
            $resetToken->email = $user->email;
        }
        $random = new \Random\Randomizer();
        $resetToken->token = bin2hex($random->getBytes(5));
        $resetToken->save();

        // directly sending because it's a demo implementation (would need to add emailing verification code for actual implementation)
        $response['verificationCode'] = $resetToken->token;
        return $this->sendResponse($response,'Verification code sent');
    }

    public function resetPassword(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'verification_token' => 'required|string',
            'password' => 'required|string',
            'repeat_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Failed.');
        }

        $user = User::where('email', $request['email'])->first();
        if(!$user) {
            return $this->sendError();
        }

        $isTokenValid = !!PasswordResetToken::where(['email' => $request['email'], 'token' => $request['verification_token']])->first();
        if(!$isTokenValid) {
            return $this->sendError('Invalid verification code');
        }

        $user->password = Hash::make($request['password']);
        $user->save();

        return $this->sendResponse(null, 'Password successfully reset');
    }
}
