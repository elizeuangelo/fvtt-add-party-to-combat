function addLinkedTokensToTracker() {
	const combat = game.combats.viewed;
	const tokens = canvas.tokens.placeables.filter((token) => {
		return token && !token.inCombat && token.document.hasPlayerOwner;
	});

	// Add tokens to the Combat encounter
	const createData = tokens.map((t) => {
		return {
			tokenId: t.id,
			sceneId: t.scene.id,
			actorId: t.document.actorId,
			hidden: t.document.hidden,
		};
	});
	return combat.createEmbeddedDocuments('Combatant', createData);
}

const button = /*html*/ `<a class="combat-button combat-add-players" data-tooltip="Add Player Tokens to Combat" data-control="addPCs">
                            <i class="fas fa-users-medical"></i>
                        </a>`;

function addButton(encounter, html, data) {
	const create = html[0].querySelector('.combat-create');
	const btn = $(button)[0];
	if (!game.combat) btn.setAttribute('disabled', '');
	btn.addEventListener('click', addLinkedTokensToTracker);
	create.insertAdjacentElement('afterend', btn);
}

/* --------------------------------------- */
Hooks.on('renderCombatTracker', addButton);
