declare namespace Lucia {
  interface Auth {
    user: {
      id: string;
      email: string;
      emailVerified: boolean;
    };
    session: {
      id: string;
      userId: string;
      expiresAt: Date;
    };
  }
}