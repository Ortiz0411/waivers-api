export interface waiver {

    id?: number;
    created_at?: string;

    name: string;
    legal_guardian: string;
    email: string;
    tour_date: string;

    alcoholism: boolean;
    claustrophobia: boolean;
    dizzines: boolean;
    ear_infection: boolean;
    epilepsy: boolean;
    peptic_ulcers: boolean;
    respiratory_problems: boolean;
    neck_injure: boolean;
    back_problems: boolean;
    drug_use: boolean;
    depression: boolean;
    heart_problems: boolean;
    recent_operation: boolean;
    headaches: boolean;
    overweight: boolean;

    other_condition: string;
    pregnancy: number;
    medications: string;
    date_medications: string;
    date_examination: string;
    date_xray: string;

    other_areas: string;
    signature: string;

    ip_address: string;
    user_agent: string;

}