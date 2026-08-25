import { BaseFeature } from './feature/base/BaseFeature';
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    hasFeature(this: any, fn: string): boolean;
    main: {
        name: string;
        slug: string;
        version: string;
        target: string;
    };
    feature: {
        test: {
            options: {
                active: boolean;
            };
            transport: string;
        };
    };
    options: {
        base: string;
        server: {
            tenant_id: string;
        };
        auth: {
            prefix: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            create_user_response_object: {};
            credential: {};
            credential_creation_option: {};
            credential_request_option: {};
            email: {};
            email_management: {};
            hanko_configuration: {};
            json_web_key_set: {};
            passcode: {};
            password: {};
            saml: {};
            session_management: {};
            status: {};
            third_party: {};
            token: {};
            user: {};
            user_management: {};
            web_authn: {};
            webauthn_login: {};
        };
    };
    entity: {
        create_user_response_object: {
            fields: never[];
            name: string;
            op: {};
            relations: {
                ancestors: never[];
            };
        };
        credential: {
            fields: {
                name: string;
                type: string;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        credential_creation_option: {
            fields: {
                name: string;
                type: string;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        credential_request_option: {
            fields: ({
                name: string;
                type: string;
                short?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        email: {
            fields: ({
                name: string;
                op: {
                    list: {
                        type: string;
                    };
                };
                req: boolean;
                short: string;
                type: string;
            } | {
                name: string;
                short: string;
                type: string;
                op?: undefined;
                req?: undefined;
            } | {
                name: string;
                type: string;
                op?: undefined;
                req?: undefined;
                short?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            params: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        email_management: {
            fields: never[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            params: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            $action: string;
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        hanko_configuration: {
            fields: {
                name: string;
                short: string;
                type: string;
            }[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        json_web_key_set: {
            fields: {
                name: string;
                type: string;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        passcode: {
            fields: ({
                name: string;
                short: string;
                type: string;
                req?: undefined;
            } | {
                name: string;
                req: boolean;
                short: string;
                type: string;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        password: {
            fields: {
                name: string;
                req: boolean;
                short: string;
                type: string;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            $action: string;
                        };
                        transform: {
                            req: {
                                password: string;
                            };
                            res: string;
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: {
                                password: string;
                            };
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        saml: {
            fields: {
                name: string;
                type: string;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            $action: string;
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: ({
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                                reqd?: undefined;
                            } | {
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            })[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            $action: string;
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        session_management: {
            fields: ({
                name: string;
                short: string;
                type: string;
                req?: undefined;
            } | {
                name: string;
                req: boolean;
                short: string;
                type: string;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        status: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: never[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        third_party: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: ({
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                                reqd?: undefined;
                            } | {
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            })[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        token: {
            fields: {
                name: string;
                type: string;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        user: {
            fields: ({
                name: string;
                short: string;
                type: string;
                op?: undefined;
            } | {
                name: string;
                op: {
                    create: {
                        req: boolean;
                        type: string;
                    };
                };
                short: string;
                type: string;
            } | {
                name: string;
                type: string;
                short?: undefined;
                op?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            params: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        user_management: {
            fields: ({
                name: string;
                short: string;
                type: string;
            } | {
                name: string;
                type: string;
                short?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        web_authn: {
            fields: ({
                name: string;
                type: string;
                short?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            params: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            params: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        webauthn_login: {
            fields: {
                name: string;
                type: string;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
    };
}
declare const config: Config;
export { config };
