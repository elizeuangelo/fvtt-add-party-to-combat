function addLinkedTokensToTracker() {
	const combat = game.combats.viewed;
	combat.scene.tokens.contents.forEach((doc) => {
		const token = doc.object;
		if (!token || token.inCombat || !doc.hasPlayerOwner) return;
		token.toggleCombat(combat);
	});
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
