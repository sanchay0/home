import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship } from '@keystone-next/fields';

export const User = list({
    fields: {
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        image: text(),
        password: password(),
        sentLooms: relationship({ 
            ref: 'LoomVideo.sender',
            ui: {
                displayMode: 'cards',
                cardFields: ['sharedUrl', 'embedUrl', 'title'],
                inlineCreate: { fields: ['sharedUrl', 'embedUrl', 'title'] },
                inlineEdit: { fields: ['sharedUrl', 'embedUrl', 'title'] },
            },
            many: true
        }),
        receivedLooms: relationship({ 
            ref: 'LoomVideo.receiver',
            ui: {
                displayMode: 'cards',
                cardFields: ['sharedUrl', 'embedUrl', 'title'],
                inlineCreate: { fields: ['sharedUrl', 'embedUrl', 'title'] },
                inlineEdit: { fields: ['sharedUrl', 'embedUrl', 'title'] },
            },
            many: true
        })
    },
})