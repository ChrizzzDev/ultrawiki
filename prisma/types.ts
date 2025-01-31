import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;
export type AdapterAccountType = "oauth" | "oidc" | "email" | "webauthn"

export const Enemy_Category = {
    Lesser: "Lesser",
    Greater: "Greater",
    Supreme: "Supreme"
} as const;
export type Enemy_Category = (typeof Enemy_Category)[keyof typeof Enemy_Category];
export const AltWeapon_Type = {
    Slab: "Slab",
    ImpactHammer: "ImpactHammer",
    SawbladeLauncher: "SawbladeLauncher"
} as const;
export type AltWeapon_Type = (typeof AltWeapon_Type)[keyof typeof AltWeapon_Type];
export const Weapon_Type = {
    Arm: "Arm",
    Revolver: "Revolver",
    Shotgun: "Shotgun",
    Nailgun: "Nailgun",
    Railcannon: "Railcannon",
    RocketLauncher: "RocketLauncher"
} as const;
export type Weapon_Type = (typeof Weapon_Type)[keyof typeof Weapon_Type];
export const Enemy_Race = {
    Husk: "Husk",
    Machine: "Machine",
    Demon: "Demon",
    Angel: "Angel",
    Unknown: "Unknown",
    PrimeSoul: "PrimeSoul"
} as const;
export type Enemy_Race = (typeof Enemy_Race)[keyof typeof Enemy_Race];
export const Enemy_Weigth = {
    Light: "Light",
    Medium: "Medium",
    Heavy: "Heavy",
    Superheavy: "Superheavy"
} as const;
export type Enemy_Weigth = (typeof Enemy_Weigth)[keyof typeof Enemy_Weigth];
export const User_Role = {
    User: "User",
    Mod: "Mod",
    Admin: "Admin"
} as const;
export type User_Role = (typeof User_Role)[keyof typeof User_Role];
export type Account = {
    id: string;
    userId: string;
    type: AdapterAccountType;
    provider: string;
    providerAccountId: string;
    refresh_token: string | undefined;
    access_token: string | undefined;
    expires_at: number | undefined;
    token_type: Lowercase<string> | undefined;
    scope: string | undefined;
    id_token: string | undefined;
    session_state: string | undefined;
};
export type AltWeapon = {
    WeaponId: number;
    Name: string;
    Type: AltWeapon_Type;
    Damage: string;
    AltDmg: string | undefined;
    Cooldown: string;
    Extras: string;
    original: number;
    obtainedIn: string;
};
export type Enemy = {
    Name: string;
    Category: Enemy_Category | undefined;
    Race: Enemy_Race;
    Weigth: Enemy_Weigth;
    /**
     * @kyselyType ( import('./_t.ts').Health )
     */
    Health: unknown;
    /**
     * @kyselyType ( import('./_t.ts').Attacks )
     */
    Attacks: unknown | undefined;
    /**
     * @kyselyType ( import('./_t.ts').Attacks )
     */
    DamageModifiers: unknown | undefined;
    DebutId: string;
};
export type File = {
    Id: number;
    Name: string;
    Type: string;
    Size: number;
    Content: Buffer;
    uploadedAt: Date;
    postId: number;
};
export type Level = {
    LevelId: string;
    Name: string;
    Act: string;
    Secret: string;
    PRank: string;
    Challenge: string;
};
export type LevelEnemy = {
    Quantity: number;
    LevelId: string;
    EnemyId: string;
};
export type Post = {
    PostId: number;
    Title: string;
    Tags: string;
    Content: string;
    createdAt: Date | undefined;
    updatedAt: Date;
    authorId: string;
};
export type Session = {
    id: string;
    userId: string;
    sessionToken: string;
    expires: Date;
};
export type Style = {
    StyleId: Generated<number>;
    Name: string;
    Color: string;
    Ordinal: string;
    Points: number;
    Decay: string;
};
export type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: Date;
    password: string;
    image: string | undefined;
};
export type VerificationToken = {
    id: string;
    identifier: string;
    token: string;
    expires: Date;
};
export type Weapon = {
    WeaponId: number;
    Name: string;
    Type: Weapon_Type;
    Damage: string;
    AltDmg: string;
    Cooldown: string;
    Extras: string;
    Price: number;
    obtainedIn: string;
};
export type DB = {
    Account: Account;
    AltWeapon: AltWeapon;
    Enemy: Enemy;
    File: File;
    Level: Level;
    LevelEnemy: LevelEnemy;
    Post: Post;
    Session: Session;
    Style: Style;
    User: User;
    VerificationToken: VerificationToken;
    Weapon: Weapon;
};
