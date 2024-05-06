
export const handleException = error => {
    switch (error.code) {
      case 'auth/weak-password':
        return 'The password is too weak';
      case 'auth/email-already-in-use':
        return 'Email is already in use';
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Wrong password provided';
      case 'auth/user-disabled':
        return 'User account has been disabled';
      case 'auth/too-many-requests':
        return 'Too many requests. Please try again later';
      case 'auth/operation-not-allowed':
        return 'Operation not allowed';
      case 'auth/invalid-action-code':
        return 'Invalid action code';
      case 'auth/expired-action-code':
        return 'Expired action code';
      case 'auth/invalid-email':
        return 'Invalid email address';
      default:
        return 'An error occurred';
    }
  };
  