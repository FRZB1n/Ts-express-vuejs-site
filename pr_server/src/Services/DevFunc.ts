import mongoose from "mongoose";

export default class DevFunc {
    public static to_objId(need_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId(need_id);
    }
    public static findMostFrequent<T>(arr: T[], count: number): T[] {
        const counts: Record<string, number> = {};
        const frequentValues: T[] = [];

        arr.forEach((item) => {
            const key = String(item);
            counts[key] = (counts[key] || 0) + 1;
        });

        const sortedKeys = Object.keys(counts).sort(
            (a, b) => counts[b] - counts[a]
        );
        for (let i = 0; i < count && i < sortedKeys.length; i++) {
            frequentValues.push(<T>(<unknown>sortedKeys[i])); // Преобразуем строку обратно в тип T
        }

        return frequentValues;
    }
}
