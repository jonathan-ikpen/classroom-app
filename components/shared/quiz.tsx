"use client"
import "@fillout/react/style.css"

import { FilloutFullScreenEmbed, FilloutPopupEmbed } from "@fillout/react";

function QuizView({ filloutId }: { filloutId: string }) {
    return (
        // <FilloutPopupEmbed filloutId={filloutId} onClose={() => {}} />
        <FilloutFullScreenEmbed filloutId={filloutId} inheritParameters />
        // <FilloutFullScreenEmbed filloutId="tyRqhhzjJQus" inheritParameters />
    );
}

export default QuizView;