import { cn } from "../lib/cn";
import { useTranslation } from "react-i18next";

interface AccuracyFormProps {
    accuracy: number[];
}

const CDEFGAB = "CDEFGAB";

export default function AccuracyForm({
    accuracy
}: AccuracyFormProps) {
    const { t } = useTranslation();
    return (
        <div className="w-full">
            <h3 className="mb-2 text-sm font-medium text-gray-700">{t('common.accuracy')}</h3>
            <div className="grid grid-cols-7 gap-1.5">
                {accuracy.map((acc, index) => {
                    const note = CDEFGAB[index];
                    const displayValue = acc === -1 ? "—" : `${Math.round(acc)}%`;

                    return (
                        <div
                            key={index}
                            className={cn(
                                "flex flex-col items-center justify-center rounded-md border border-gray-200 py-2",
                                "transition-colors duration-250"
                            )}
                        >
                            <span className="text-base font-bold text-gray-800">{note}</span>
                            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-full rounded-full bg-gray-800 transition-all duration-500"
                                    style={{ width: acc === -1 ? "0%" : `${Math.min(acc, 100)}%` }}
                                />
                            </div>
                            <span className={cn(
                                "mt-1 text-xs font-medium",
                                acc === -1 ? "text-gray-400" : "text-gray-600"
                            )}>
                                {displayValue}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
